import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import PosList from './views/control/posList';
import Login from './views/login/login.access';
import Dashboard from './views/control/dashboards/dashboard';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/panelcontrol" element={user ? <PosList /> : <Navigate to="/" replace />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default AppRoutes;
