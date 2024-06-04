import  { createContext, useState, useEffect, ReactNode, FC } from 'react';
import Cookies from 'js-cookie';
import { login as loginService, getUser as getUserService, UserByID, deleteUser as deleteUserService} from '../../api/auth/authapi';

interface User {
  id: number;
  nombre: string;
  propietario: string;
}

export interface AuthContextType {
  user: User[] | null;
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
  const [user, setUser] = useState<User[] | null>(null); // Cambiado el tipo de user a User[] | null

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    Cookies.set('authToken', data.token, { expires: 7 });
    console.log('Token saved:', Cookies.get('authToken'));
    const userData = await getUserService(data.token);
    console.log('User data fetched after login:', userData);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setUser(null); // Cambiado el valor a null cuando se hace logout
  };


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
    <AuthContext.Provider value={{ user, login, logout, fetchUserByID, deleteUserById}}>
      {children}
    </AuthContext.Provider>
  );
};
