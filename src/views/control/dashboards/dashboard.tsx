import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { People } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="mb-8 rounded-lg bg-white p-6 shadow" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
            <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader>
                        <People className="h-8 w-8 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-semibold">Total de usuarios</h3>
                        <div className="text-4xl font-bold">{user?.length || 0}</div>
                    </CardContent>
                </Card>
                {/* Aquí puedes añadir más Cards para mostrar otros datos relevantes del dashboard */}
            </div>

            
        </div>
    );
};

export default Dashboard;
