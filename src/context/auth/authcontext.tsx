import  { createContext, useState, useEffect, ReactNode, FC } from 'react';
import Cookies from 'js-cookie';
import { login as loginService, getUser as getUserService } from '../../api/auth/authapi';

interface User {
  id: number;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
    setUser(null);
    console.log('Logged out, token removed');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('authToken');
      if (token) {
        try {
          const userData = await getUserService(token);
          console.log('User fetched:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
          Cookies.remove('authToken');
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

