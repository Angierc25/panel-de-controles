// src/views/control/PosList.tsx

import React from 'react';
import useAuth from '../../hooks/useAuth';

const PosList: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Panel de Control</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      {/* Aquí puedes agregar el resto del contenido del panel de control */}
    </div>
  );
};

export default PosList;
