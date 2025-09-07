import React from 'react';

const DebugData = ({ data, title, loading, error }) => {
  return (
    <div style={{
      background: 'rgba(255, 0, 0, 0.1)',
      border: '2px solid red',
      padding: '20px',
      margin: '20px 0',
      borderRadius: '8px',
      color: 'white'
    }}>
      <h3 style={{ color: 'red', marginBottom: '10px' }}>DEBUG: {title}</h3>
      <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
      <p><strong>Error:</strong> {error || 'None'}</p>
      <p><strong>Data Type:</strong> {Array.isArray(data) ? 'Array' : typeof data}</p>
      <p><strong>Data Length:</strong> {Array.isArray(data) ? data.length : 'N/A'}</p>
      <p><strong>Data Preview:</strong></p>
      <pre style={{
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '10px',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '200px'
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default DebugData;
