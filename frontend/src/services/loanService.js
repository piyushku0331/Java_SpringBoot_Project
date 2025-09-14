import api from "./api";

export const applyLoan = (data) => api.post("/loans/apply", data);
export const getLoanStatus = () => api.get("/loans/status");

export const getCustomerLoans = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch loans.");
  }
  
  console.log("=== loanService: Starting loan fetch ===");
  console.log("loanService: userId:", userId);
  console.log("loanService: token available:", !!localStorage.getItem('token'));
  
  const endpoints = [
    `/customer/loans?userId=${userId}`,
    `/customer/loans/${userId}`,
    `/customer/${userId}/loans`,
    `/loans/customer/${userId}`,
    `/loans`
  ];
  
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    try {
      console.log(`loanService: Trying endpoint ${i + 1}/${endpoints.length}: ${endpoint}`);
      const response = await api.get(endpoint);
      console.log(`loanService: SUCCESS on endpoint ${endpoint}`);
      console.log(`loanService: Response status:`, response.status);
      console.log(`loanService: Response type:`, typeof response.data);
      console.log(`loanService: Response data length:`, response.data ? response.data.toString().length : 'N/A');
      console.log(`loanService: Response data preview:`, response.data ? response.data.toString().substring(0, 200) + '...' : 'N/A');
      console.log(`loanService: Response headers:`, response.headers);

      // Additional validation for JSON response
      if (typeof response.data === 'string') {
        console.log(`loanService: Response is string, checking if valid JSON`);
        console.log(`loanService: Response starts with:`, response.data.substring(0, 100));

        // Check if response looks like HTML
        if (response.data.trim().startsWith('<!DOCTYPE') || response.data.trim().startsWith('<html')) {
          console.error(`loanService: Response appears to be HTML error page!`);
          console.error(`loanService: HTML response preview:`, response.data.substring(0, 300));
          throw new Error('Received HTML error page instead of JSON');
        }

        try {
          JSON.parse(response.data);
          console.log(`loanService: String response is valid JSON`);
        } catch (jsonError) {
          console.error(`loanService: String response is NOT valid JSON:`, jsonError.message);
          console.error(`loanService: First 500 chars of response:`, response.data.substring(0, 500));

          // Try to extract error message from HTML if it's an error page
          const titleMatch = response.data.match(/<title>(.*?)<\/title>/i);
          if (titleMatch) {
            console.error(`loanService: HTML page title:`, titleMatch[1]);
          }
        }
      }

      return response.data;
    } catch (error) {
      console.log(`loanService: FAILED on endpoint ${endpoint}:`, error.response?.status, error.message);
      if (error.response) {
        console.log(`loanService: Error response type:`, typeof error.response.data);
        console.log(`loanService: Error response data preview:`, error.response.data ? error.response.data.toString().substring(0, 200) + '...' : 'N/A');
        console.log(`loanService: Error details:`, error.response.data);
      }
      
      // Continue to next endpoint unless it's the last one
      if (i === endpoints.length - 1) {
        console.error("loanService: All endpoints failed, returning empty array");
        return [];
      }
    }
  }
};

export const getLoanDetails = async (loanId) => {
  try {
    const response = await api.get(`/customer/loans/${loanId}`);
    // Check for HTML error response before returning
    if (typeof response.data === 'string') {
      const data = response.data.trim();

      // Check for obvious HTML
      if (data.startsWith('<!DOCTYPE') ||
          data.startsWith('<html') ||
          data.includes('<head>') ||
          data.includes('<body>')) {
        console.error(`loanService: ERROR - Received HTML error page instead of JSON!`);
        console.error(`loanService: HTML response preview:`, data.substring(0, 500));
        throw new Error('Received HTML error page instead of JSON response');
      }

      // Check for JSON followed by non-JSON content (truncated response)
      if ((data.startsWith('[') || data.startsWith('{'))) {
        console.log(`loanService: Attempting JSON extraction from ${data.length} character response`);

        try {
          // Try to find the end of valid JSON
          let jsonEndIndex = -1;
          let braceCount = 0;
          let inString = false;
          let escapeNext = false;

          for (let i = 0; i < data.length; i++) {
            const char = data[i];

            if (escapeNext) {
              escapeNext = false;
              continue;
            }

            if (char === '\\') {
              escapeNext = true;
              continue;
            }

            if (char === '"' && !escapeNext) {
              inString = !inString;
              continue;
            }

            if (!inString) {
              if (char === '{' || char === '[') {
                braceCount++;
              } else if (char === '}' || char === ']') {
                braceCount--;
                if (braceCount === 0) {
                  jsonEndIndex = i;
                  console.log(`loanService: Found JSON end at position ${i}, brace count: ${braceCount}`);
                  break;
                }
              }
            }
          }

          console.log(`loanService: JSON extraction results - endIndex: ${jsonEndIndex}, totalLength: ${data.length}`);

          if (jsonEndIndex > 0 && jsonEndIndex < data.length - 1) {
            console.warn(`loanService: WARNING - Found extra content after JSON at position ${jsonEndIndex + 1}`);
            console.warn(`loanService: Character at end of JSON: '${data[jsonEndIndex]}'`);
            console.warn(`loanService: Character after JSON: '${data[jsonEndIndex + 1]}'`);
            console.warn(`loanService: Extra content preview:`, data.substring(jsonEndIndex + 1, Math.min(jsonEndIndex + 100, data.length)));

            // Extract only the valid JSON part
            const validJson = data.substring(0, jsonEndIndex + 1);
            console.log(`loanService: Extracted JSON length: ${validJson.length}`);
            console.log(`loanService: Extracted JSON starts with:`, validJson.substring(0, 100));
            console.log(`loanService: Extracted JSON ends with:`, validJson.substring(validJson.length - 100));

            const parsedData = JSON.parse(validJson);
            console.log(`loanService: Successfully parsed extracted JSON, type: ${typeof parsedData}, isArray: ${Array.isArray(parsedData)}`);
            return parsedData;
          } else {
            console.log(`loanService: No extra content found after JSON, using full response`);
          }
        } catch (parseError) {
          console.error(`loanService: JSON parsing failed during extraction:`, parseError.message);
          console.error(`loanService: Parse error at position:`, parseError.message.match(/position (\d+)/)?.[1]);
          // Continue with original response
        }
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching loan details:", error);
    throw error;
  }
};

export const makeLoanPayment = async (loanId, paymentData) => {
  try {
    const response = await api.post(`/customer/loans/${loanId}/payments`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error making loan payment:", error);
    throw error;
  }
};

export const getLoanPaymentSchedule = async (loanId) => {
  try {
    const response = await api.get(`/customer/loans/${loanId}/payment-schedule`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loan payment schedule:", error);
    throw error;
  }
};

// Debug function for testing loans endpoint directly
export const testLoansEndpoint = async (userId) => {
  console.log('=== Testing Loans Endpoint Directly ===');
  console.log('User ID:', userId);
  console.log('Token available:', !!localStorage.getItem('token'));

  const testEndpoint = `/customer/loans?userId=${userId}`;
  console.log('Testing endpoint:', testEndpoint);

  try {
    const response = await fetch(`http://localhost:8080/api${testEndpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log('Response type:', typeof text);
    console.log('Response length:', text.length);
    console.log('Response preview:', text.substring(0, 200));

    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error('ERROR: Received HTML response instead of JSON!');
      return { error: 'HTML response received', html: text.substring(0, 500) };
    }

    try {
      const json = JSON.parse(text);
      console.log('SUCCESS: Valid JSON response:', json);
      return json;
    } catch (jsonError) {
      console.error('ERROR: Invalid JSON response:', jsonError.message);
      return { error: 'Invalid JSON', raw: text.substring(0, 500) };
    }
  } catch (error) {
    console.error('ERROR: Network or other error:', error);
    return { error: error.message };
  }
};
