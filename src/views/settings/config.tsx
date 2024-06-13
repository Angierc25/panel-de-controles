import React from 'react';
import { CardHeader, Typography , CardContent } from '@mui/material';
import useAuth from '../../hooks/useAuth'; // Ajusta la ruta según sea necesario

const LogoutCard: React.FC = () => {
  const { logout } = useAuth(); // Ajusta el hook de autenticación según sea necesario

  const handleLogout = () => {
    logout();
    // Agrega aquí cualquier otra lógica que necesites después de cerrar sesión, como redireccionar a la página de inicio, etc.
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow ml-16 sm:max-w-full sm:ml-0 md:ml-64 lg:ml-80 xl:ml-72">
      <CardHeader
        title={<Typography variant="h5" fontWeight="bold">Cerrar Sesion</Typography>}
        subheader={
            <Typography variant="body2" color="textSecondary">
              Finaliza tu sesión actual.
            </Typography>
          }>
      </CardHeader>
      <CardContent className="grid gap-4">
        <button className='rounded-lg bg-red-500 p-3 text-white hover:bg-gray-200 hover:text-gray-700 transition duration-200' onClick={handleLogout}>Cerrar sesión</button>
      </CardContent>
    </div>
  );
};

export default LogoutCard;
