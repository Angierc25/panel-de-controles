import { Link, useLocation } from 'react-router-dom';
import { FC } from "react";
import { Dashboard, Settings } from '@mui/icons-material';

const Nav: FC = () => {
  const location = useLocation();

  // Ocultar navbar en la página de login
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-gray-400 sm:w-64 w-20 overflow-auto">
      <header className="bg-gray-900 px-5 py-4 text-white">
        <h1 className="text-2xl font-bold sm:block hidden">Panel de Controles</h1>
      </header>
      <nav className="p-6">
        <ul className="space-y-4">
          <li>
            <Link to="/panelcontrol" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white">
              <Dashboard className="h-5 w-5 " />
              <span className="hidden sm:block">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white">
              <Settings className="h-5 w-5" />
              <span className="hidden sm:block">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
