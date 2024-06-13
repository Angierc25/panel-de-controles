import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { AccountCircle, Settings as SettingsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Settings: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="mb-8 rounded-lg bg-white p-6 shadow w-full ml-16 sm:max-w-full sm:ml-0 md:ml-64 lg:ml-80 xl:ml-72">
            <h2 className="mb-4 text-xl font-bold">Configuracion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-4">
                <Card>
                    <AccountCircle className="text-blue-500 ml-4" fontSize="large" />
                    <CardHeader
                        title={<Typography variant="h5" fontWeight="bold">Mi cuenta</Typography>}>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Administre su información personal y la contraseña de su cuenta.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="rounded-lg bg-white p-3 border border-gray-400 dark:text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition duration-200"
                                onClick={() => navigate('/profile')}>
                                Edite su perfil
                            </button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <SettingsIcon className="text-blue-500 ml-4" fontSize="large" />
                    <CardHeader
                        title={<Typography variant="h5" fontWeight="bold">Configuracion</Typography>}>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Administre la configuración de su cuenta.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="rounded-lg bg-white p-3 border border-gray-400 dark:text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition duration-200"
                                onClick={() => navigate('/config')}>
                                Ir a configuración
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
