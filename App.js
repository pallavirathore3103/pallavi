import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './App.css';

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (  secureLocalStorage.setItem('token')) {
      navigate('/');
    }
  }, []);
  return <AppRoutes />;
};


const App = () => {
 
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
