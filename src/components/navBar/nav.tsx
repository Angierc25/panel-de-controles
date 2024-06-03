import { Link, useLocation } from 'react-router-dom';
import { FC } from "react";

interface IconProps {
  className?: string;
}

const LayoutDashboardIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const SettingsIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UsersIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Nav: FC = () => {
  const location = useLocation();

  // Ocultar navbar en la página de login
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-gray-400">
      <header className="bg-gray-900 px-5 py-4 text-white">
        <h1 className="text-2xl font-bold">Panel de Controles</h1>
      </header>
      <nav className="p-6">
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white">
              <LayoutDashboardIcon className="h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white">
              <SettingsIcon className="h-5 w-5" />
              Settings
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white">
              <UsersIcon className="h-5 w-5" />
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
