import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth/authcontext';
import AppRoutes from './AppRoutes';
import Nav from './components/navBar/nav';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
