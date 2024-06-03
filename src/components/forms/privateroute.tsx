import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { user } = useAuth();

  // Redirigir a la página de inicio de sesión si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Permitir acceso a la ruta privada si el usuario está autenticado
  return <Route path={path} element={element} />;
};

export default PrivateRoute;