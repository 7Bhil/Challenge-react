import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fermer la sidebar en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Obtenir le nom du menu actif basé sur l'URL
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'accueil';
    if (path === '/utilisateurs') return 'utilisateurs';
    if (path === '/challenges') return 'challenges';
    if (path === '/jurys') return 'jurys';
    if (path === '/parametres') return 'parametres';
    if (path === '/notifications') return 'notifications';
    return 'accueil';
  };

  const handleMenuClick = (menuId) => {
    const routes = {
      'accueil': '/dashboard',
      'utilisateurs': '/utilisateurs',
      'challenges': '/challenges',
      'jurys': '/jurys',
      'parametres': '/parametres',
      'notifications': '/notifications'
    };
    
    if (routes[menuId]) {
      navigate(routes[menuId]);
    }
    setSidebarOpen(false);
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        ref={sidebarRef}
        activeMenu={getActiveMenu()}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleMenuClick={handleMenuClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header 
          activeMenu={getActiveMenu()} 
          setSidebarOpen={setSidebarOpen} 
          onNotificationsClick={handleNotificationsClick}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;