import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from '../Navbar';
import useScreen from '../../hooks/useScreen';
import UserProfile from './UserProfile';
import { useTheme } from '../../context/ThemeContext';

// Lazy load components
const Sidebar = React.lazy(() => import('../Sidebar'));
const MobileSidebar = React.lazy(() => import('../MobileSidebar'));
const Users = React.lazy(() => import('./Users'));
const AddUser = React.lazy(() => import('./AddUser'));

const Main = () => {
  const { isSmallScreen } = useScreen();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
       {/* Navbar at the top */}
      <AppNavbar onToggleSidebar={toggleSidebar} />

      {/* Main content container */}
      <div className="flex h-full flex-1 overflow-hidden">
        {/* SideMenu with fixed width and full height */}
        <Suspense fallback={null}>
          {isSmallScreen ? (
            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          ) : (
            <div className="mt-2">
              <Sidebar />
            </div>
          )}
        </Suspense>

        {/* Render nested routes */}
        <main className="bg-light-background dark:bg-dark-background flex-1 overflow-y-auto overflow-x-hidden">
          <Suspense fallback={null}>
            <Routes>
              <Route path="users" element={<Users />} />
              <Route path="user/*" element={<UserProfile />} />
              <Route path="add-user" element={<AddUser />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Main;
