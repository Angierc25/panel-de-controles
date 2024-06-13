import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="mb-8 rounded-lg bg-white p-6 shadow ml-16 sm:max-w-full sm:ml-0 md:ml-64 lg:ml-80 xl:ml-72">
            <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Card>
                <Group className="text-blue-500 ml-4" fontSize="large"/> 
                        <CardHeader
                            title={<Typography variant="h5" className="font-bold">Usuarios Activos</Typography>}
                            className="p-0"
                        />
                    <CardContent>
                        <div className="text-4xl font-bold text-center">{user?.length || 0}</div>
                    </CardContent>
                </Card>
                {/* Aquí puedes añadir más Cards para mostrar otros datos relevantes del dashboard */}
            </div>
        </div>

    );
};

export default Dashboard;
