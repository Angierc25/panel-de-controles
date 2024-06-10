import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import Cookies from 'js-cookie';
import {
  login as loginService,
  logout as logoutService,
  getUser as getUserService,
  UserByID,
  deleteUser as deleteUserService,
  getAuth as getAuthService,
  editAuth as editAuthService,
  changePassword as changePasswordService
} from '../../api/auth/authapi';

interface Auth {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  token: string;
}

interface User {
  id: number;
  nombre: string;
  propietario: string;
}

export interface AuthContextType {
  user: User[] | null;
  auth: Auth | null;
  authID: number | null; // Agregamos authID al contexto
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserByID: (userID: number) => Promise<void>;
  deleteUserById: (userID: number) => Promise<void>;
  editAuthByID: (updatedData: any) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<User[] | null>(null);
  const [authID, setAuthID] = useState<number | null>(null);


  
  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);
      Cookies.set('authToken', data.token, { expires: 7 });
      console.log('Token saved:', Cookies.get('authToken'));

      // Aquí obtenemos el authID del data.usuario_id y lo establecemos en el estado
      setAuthID(data.usuario_id);

      // Fetch user data if necessary
      const userData = await getUserService(data.token);
      console.log('User data fetched after login:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    const token = Cookies.get('authToken');
    if (token) {
      await logoutService(token);
      Cookies.remove('authToken');
      setUser(null);
      setAuth(null);
      setAuthID(null);
    }
  };

  const fetchAuth = async (authID: number) => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const authData = await getAuthService(token, authID);
        console.log('Auth fetched:', authData);
        setAuth(authData);
      } catch (error) {
        console.error('Error fetching auth:', error);
        Cookies.remove('authToken');
      }
    }
  };

  useEffect(() => {
    if (authID !== null) {
      fetchAuth(authID);
    }
  }, [authID]);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      const storedAuthID = Cookies.get('authID'); // Almacena authID en cookies
      if (storedAuthID) {
        setAuthID(Number(storedAuthID));
        fetchAuth(Number(storedAuthID));
        fetchUser();
      }
    }
  }, []);

  // Almacenar authID en cookies o cuando cambia
  useEffect(() => {
    if (authID !== null) {
      Cookies.set('authID', authID.toString());
      fetchAuth(authID);
    } else {
      Cookies.remove('authID');
    }
  }, [authID]);

  const editAuthByID = async (updatedData: any) => {
    const token = Cookies.get('authToken');
    if (token && authID !== null) {
      try {
        const updatedAuth = await editAuthService(token, authID, updatedData);
        console.log('Auth updated:', updatedAuth);
        setAuth(updatedAuth); // Actualizar el estado con los datos modificados
      } catch (error) {
        console.error('Error updating auth:', error);
      }
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    const token = Cookies.get('authToken');
    if (token && authID !== null) {
      try {
        const response = await changePasswordService(token, authID, currentPassword, newPassword, confirmPassword);
      console.log('Password changed successfully');
      return response; 
      } catch (error) {
        console.error('Error changing password:', error);
      }
    }
  };

  //
  //todas las funciones de aqui van para los usuarios que estan en la app.
  const fetchUserByID = async (userID: number) => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const user = await UserByID(token, userID);
        console.log('User fetched by ID:', user);
        // Aquí puedes hacer lo que necesites con el usuario obtenido
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      }
    }
  };

  const deleteUserById = async (userID: number) => {
    const token = Cookies.get('authToken');
    if (!token) {
      console.error('No token found');
      return Promise.reject('No token found');
    }

    try {
      await deleteUserService(token, userID);
      setUser((prevUser) => prevUser?.filter((user) => user.id !== userID) || null);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const fetchUser = async () => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const user = await getUserService(token);
        console.log('User fetched:', user);
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        Cookies.remove('authToken');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authID, auth, user, login, logout, fetchUserByID, deleteUserById, editAuthByID, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};