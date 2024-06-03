import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import PosList from './views/control/posList';
import Login from './views/login/login.access';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/panelcontrol', { replace: true });
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/panelcontrol" element={user ? <PosList /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
