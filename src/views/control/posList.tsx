import React from 'react';
import useAuth from '../../hooks/useAuth';
import Dashboard from './dashboards/dashboard';
import Table from './tablasUser/tableuser';

const PosList: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Dashboard />
      <Table/>
      <button onClick={handleLogout}>Cerrar Sesión</button>

    </>
  );
};

export default PosList;
