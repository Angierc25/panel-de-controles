import React from 'react';
import { Card, CardContent, CardHeader, Typography} from '@mui/material';
import {  Group } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

    return (
        <div className="mb-8 rounded-lg bg-white p-6 shadow" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
            <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <Card>
                <Group className="text-blue-500 ml-4" fontSize="large"/> 
                <CardHeader
                    title={<Typography variant="h5" fontWeight="bold">Total de usuarios</Typography>}>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center">{user?.length || 0}</div>
                    </CardContent>
                </Card>
                {/* Aquí puedes añadir más Cards para mostrar otros datos relevantes del dashboard */}
            </div>

            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Dashboard;
