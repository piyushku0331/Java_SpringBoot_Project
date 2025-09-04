import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/Approutes";
import { AuthProvider, useAuth } from "./context/AuthContext";


function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? <Navbar /> : <Header />}
      <AppRoutes />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
