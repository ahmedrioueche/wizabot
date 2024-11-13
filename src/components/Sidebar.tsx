import React, { useEffect, useState } from 'react';
import { Settings, LucideIcon, Users, UserPlus, Users2, LayoutDashboard } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface MenuItem {
  id: number;
  title: string;
  icon: LucideIcon;
  path?: string;
}

interface SideBarProps {
  className?: string;
}

const Sidebar: React.FC<SideBarProps> = ({ className = '' }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page: string | undefined = location.pathname.split('/').pop();
    setCurrentPage(page!);
  }, [location]);

  const menuItems: MenuItem[] = [
    { id: 1, title: 'Users', icon: Users2, path: 'users' },
    { id: 2, title: 'Add User', icon: UserPlus, path: 'add-user' },
    { id: 3, title: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
    { id: 4, title: 'Settings', icon: Settings, path: 'settings' },
  ];

  const handleLinkClick = (id: number) => {
    const item = menuItems.find(item => item.id === id); // Find the menu item by id
    if (item) {
      navigate('/main/' + item.path!);
    }
  };

  return (
    <div
      className={`font-f1 border-light-muted/10 hover:border-light-muted/40 dark:border-dark-muted/10 dark:hover:border-dark-muted/20 bg-light-background dark:bg-dark-background relative flex h-full w-64 flex-col border p-4 transition-all duration-300 ease-in-out ${className}`}
    >
      {/* Navigation items */}
      <nav className="mt-16 flex-1 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isItemHovered = hoveredItem === item.id;
          const isItemCurrent = currentPage === item.path;
          return (
            <button
              key={item.id}
              className={`group/item relative flex w-full items-center rounded-lg px-4 py-3 transition-all duration-200 ${
                isItemHovered || isItemCurrent
                  ? 'text-light-accentPrimary dark:bg-dark-primary/30 dark:text-dark-accentPrimary bg-light-primary/30'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
              } }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              type="button"
              onClick={() => handleLinkClick(item.id)}
            >
              <Icon
                className={`mr-3 h-5 w-5 transition-transform duration-300 group-hover/item:scale-110 ${
                  isItemHovered ? 'text-light-accentPrimary dark:text-dark-accentPrimary' : ''
                }`}
              />
              <span className="text-base font-medium">{item.title}</span>

              {/* Animated highlight line */}
              <div
                className={`bg-light-primary dark:bg-dark-primary absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                  isItemHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* User profile section */}
      <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
        <div className="flex items-center px-4">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
