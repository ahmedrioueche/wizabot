import React, { useEffect, useState } from 'react';
import { Settings, LucideIcon, Users2, UserPlus, LayoutDashboard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { dict } from '../utils/dict';
import logo from '../assets/images/logo.png';
import { FaArrowLeft, FaBars } from 'react-icons/fa';

interface MenuItem {
  id: number;
  title: string;
  icon: LucideIcon;
  path?: string;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const language = useLanguage();
  const text = dict[language];

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
    const item = menuItems.find(item => item.id === id);
    if (item) {
      navigate('/main/' + item.path!);
      onClose(); // Close sidebar after navigating
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`font-f1 bg-light-background dark:bg-dark-background fixed left-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Main content wrapper with flex */}
        <div className="flex h-full flex-col">
          {/* Header section */}
          <div className="p-4 pb-0">
            <div className="flex flex-row">
              <div
                onClick={onClose}
                className="text-light-primary dark:text-dark-primary ml-2 mr-1 mt-1 cursor-pointer"
              >
                <FaArrowLeft size={24} />
              </div>
              <div className="ml-2 flex cursor-pointer flex-row items-center justify-center">
                <img src={logo} alt="Logo" className="mb-1" width={22} height={22} />
                <span className="font-f2 text-light-text-primary dark:text-dark-text-primary ml-2 text-2xl font-bold">
                  {text.logo}
                </span>
              </div>
            </div>
          </div>
          {/* Navigation items */}
          <div className="border-light-muted/20 dark:border-dark-muted/20 mt-3.5 flex-1 space-y-2 border-t px-4">
            <nav className="mt-4 space-y-2">
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
                    }`}
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
          </div>

          {/* User profile section - now at bottom */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
