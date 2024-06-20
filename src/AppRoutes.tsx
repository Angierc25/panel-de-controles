import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import PosList from './views/control/posList';
import Login from './views/login/login.access';
import Settings from './views/settings/settings.user';
import Profile from './views/settings/profile';
import Config from './views/settings/config';
import NewUserForm from './views/control/forms/formUser';

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
      <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" replace />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" replace />} />
      <Route path="/config" element={user ? <Config /> : <Navigate to="/" replace />} />
      <Route path="/newUser" element={user ? <NewUserForm /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default AppRoutes;
