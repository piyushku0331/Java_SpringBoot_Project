import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/Approutes";
import { AuthProvider } from "./context/AuthContext";
import './styles/global.css';
import './styles/page-transitions.css';
import './styles/animations.css';
import SEO from "./components/common/SEO";


function AppContent() {
  return (
    <>
      <SEO
        title="NextGen Bank — Secure Digital Banking"
        description="Manage accounts, loans, and transactions with a secure, modern experience."
        keywords="bank, digital banking, india, upi, imps, neft, rtgs, loans, accounts, transactions"
        canonical={window.location.origin + window.location.pathname}
        og={{
          type: 'website',
          image: '/favicon.ico',
          url: window.location.href
        }}
        twitter={{ card: 'summary' }}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NextGen Bank",
          "url": window.location.origin,
          "logo": "/favicon.ico",
          "sameAs": [
            "https://twitter.com/",
            "https://www.linkedin.com/"
          ]
        }}
      />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
