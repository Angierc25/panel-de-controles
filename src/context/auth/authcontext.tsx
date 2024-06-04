import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import Cookies from 'js-cookie';
import {
  login as loginService,
  getUser as getUserService,
  UserByID,
  deleteUser as deleteUserService,
  getAuth as getAuthService,
} from '../../api/auth/authapi';

interface Auth {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
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
  logout: () => void;
  fetchUserByID: (userID: number) => Promise<void>;
  deleteUserById: (userID: number) => Promise<void>;
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
    const data = await loginService(email, password);
    Cookies.set('authToken', data.token, { expires: 7 });
    console.log('Token saved:', Cookies.get('authToken'));
    const userData = await getUserService(data.token);
    console.log('User data fetched after login:', userData);
    setUser(userData);
    if (userData && userData.length > 0) {
      setAuthID(userData[0].id);
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setUser(null);
    setAuth(null);
    setAuthID(null); // Asegúrate de establecer authID en null al hacer logout
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
    <AuthContext.Provider value={{ authID, auth, user, login, logout, fetchUserByID, deleteUserById }}>
      {children}
    </AuthContext.Provider>
  );
};
