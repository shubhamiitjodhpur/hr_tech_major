import React from 'react';
import { Home, Users, Briefcase, ChevronDown, LogOut, User, BarChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  const { user, logout, switchRole } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const getNavItemsForRole = (role: UserRole) => {
    switch (role) {
      case 'hr-admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { id: 'employees', label: 'Employees', icon: <Users size={20} /> },
          { id: 'jobs', label: 'Open Positions', icon: <Briefcase size={20} /> },
          { id: 'metrics', label: 'Metrics', icon: <BarChart size={20} /> }
        ];
      case 'manager':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { id: 'my-team', label: 'My Team', icon: <Users size={20} /> },
          { id: 'reviews', label: 'Redeployment Requests', icon: <Briefcase size={20} /> }
        ];
      case 'employee':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { id: 'job-matches', label: 'Job Matches', icon: <Briefcase size={20} /> },
          { id: 'my-skills', label: 'My Skills', icon: <User size={20} /> }
        ];
      default:
        return [];
    }
  };

  const switchUserRole = (role: UserRole) => {
    switchRole(role);
    setShowUserMenu(false);
    setActivePage('dashboard');
  };

  if (!user) return null;

  const navItems = getNavItemsForRole(user.role);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">REDEPLO-AI</span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16
                    ${activePage === item.id
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                  `}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2 text-gray-700">{user.name}</span>
                {user.avatar ? (
                  <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    {user.name.charAt(0)}
                  </div>
                )}
                <ChevronDown size={16} className="ml-1 text-gray-400" />
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    Signed in as <span className="font-semibold">{user.email}</span>
                  </div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                    SWITCH ROLE (DEMO)
                  </div>
                  <button
                    onClick={() => switchUserRole('hr-admin')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    HR Admin
                  </button>
                  <button
                    onClick={() => switchUserRole('manager')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Manager
                  </button>
                  <button
                    onClick={() => switchUserRole('employee')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Employee
                  </button>
                  <div className="border-t border-gray-100">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};