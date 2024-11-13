// components/Navbar.tsx
import React, { useState } from 'react';
import { Bell, Moon, Settings, Sun } from 'lucide-react';
import { dict } from '../utils/dict';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/images/logo.png';
import { useTheme } from '../context/ThemeContext';
import { FaBars } from 'react-icons/fa';

interface NavItem {
  id: number;
  title: string;
  path: string;
}

const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const language = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const text = dict[language];

  const navItems: NavItem[] = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'Products', path: '/products' },
    { id: 3, title: 'Services', path: '/services' },
    { id: 4, title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="border-light-muted/10 hover:border-light-muted/40 dark:border-dark-muted/10 dark:bg-dark-background dark:hover:border-dark-muted/20 bg-light-background group fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b px-6 shadow-sm transition-all duration-300">
      {/* Left side - Logo */}
      <div className="flex flex-row">
        <div
          onClick={() => onToggleSidebar()}
          className="text-light-primary dark:text-dark-primary cursor-pointer md:hidden"
        >
          <FaBars className="mr-3 mt-1" size={24} />
        </div>
        <div className="flex cursor-pointer flex-row items-center justify-center">
          <img src={logo} alt="Logo" className="mb-1" width={22} height={22} />
          <span className="font-f2 text-light-text-primary dark:text-dark-text-primary ml-2 text-2xl font-bold">
            {text.logo}
          </span>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 relative rounded-full p-2 transition-all duration-300"
        >
          {isDarkMode ? (
            <Sun className="text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary h-5 w-5 transition-all duration-300 hover:scale-110" />
          ) : (
            <Moon className="text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary h-5 w-5 transition-all duration-300 hover:scale-110" />
          )}
        </button>

        {/* Notification */}
        <button className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 group relative hidden rounded-full p-2 transition-all duration-300 md:block">
          <Bell className="text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary h-5 w-5 transition-all duration-300 hover:scale-110" />
          <div className="bg-light-primary dark:bg-dark-primary absolute right-1.5 top-1.5 h-2 w-2 rounded-full"></div>
        </button>

        {/* Settings */}
        <button className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 group hidden rounded-full p-2 transition-all duration-300 md:block">
          <Settings className="text-light-text-secondary hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary h-5 w-5 transition-all duration-300 hover:rotate-45 hover:scale-110" />
        </button>

        {/* Profile */}
        <button className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 group flex items-center space-x-2 rounded-full transition-all duration-300">
          <div className="bg-light-primary/20 dark:bg-dark-primary/20 h-8 w-8 rounded-full transition-transform duration-300 hover:scale-110"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
