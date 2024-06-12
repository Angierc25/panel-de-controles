import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Delete, CheckCircle } from '@mui/icons-material';

const Table: React.FC = () => {
    const { user, setUser, userCero, setUserCero, deleteUserById, toggleUserStatusById } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermUserCero, setSearchTermUserCero] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchUserCero = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermUserCero(event.target.value);
    };

    const handleActivate = async (userID: number) => {
    try {
      await toggleUserStatusById(userID);
      const activatedUser = userCero?.find((u) => u.id === userID);
      if (activatedUser) {
        setUserCero((prevUsers) => prevUsers?.filter((u) => u.id !== userID) || null);
        setUser((prevUsers) => [...(prevUsers || []), { ...activatedUser, estado: true }]);
      }
      console.log('User activated successfully');
      Swal.fire({
        title: 'Usuario activado',
        text: 'El usuario ha sido activado exitosamente.',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error('Error toggling user status:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al activar el usuario.',
        icon: 'error',
      });
    }
  };

  const handleDelete = async (userID: number) => {
    try {
      await deleteUserById(userID);
      const deletedUser = user?.find((u) => u.id === userID);
      if (deletedUser) {
        setUser((prevUsers) => prevUsers?.filter((u) => u.id !== userID) || null);
        setUserCero((prevUsers) => [...(prevUsers || []), { ...deletedUser, estado: false }]);
      }
      console.log('User deleted successfully');
      Swal.fire({
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado exitosamente.',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar el usuario.',
        icon: 'error',
      });
    }
  };
    return (
        <div>
        <div className="mb-8 rounded-lg bg-white p-6 shadow overflow-x-auto" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Usuarios</h3>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar negocio..."
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Negocio
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {user && user
                            .filter(userData => userData.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((userData, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {userData.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {userData.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {userData.propietario}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <button
                                        onClick={() => handleDelete(userData.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                                    >
                                        <Delete className="mr-2" />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="mb-8 rounded-lg bg-white p-6 shadow overflow-x-auto" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Usuarios Suspendidos</h3>
                <input
                    type="text"
                    value={searchTermUserCero}
                    onChange={handleSearchUserCero}
                    placeholder="Buscar negocio..."
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Negocio
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {userCero && userCero
                            .filter(userData => userData.nombre.toLowerCase().includes(searchTermUserCero.toLowerCase()))
                            .map((userData, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {userData.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {userData.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {userData.propietario}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <button
                                        onClick={() => handleActivate(userData.id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                                    >
                                        <CheckCircle className="mr-2" />
                                        Activar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Table;
