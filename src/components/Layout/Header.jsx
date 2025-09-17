import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeMenu, setSidebarOpen }) => {
  const navigate = useNavigate();
  
  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-3"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 capitalize">
            {activeMenu}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64"
            />
          </div>
          
          <button className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Search size={20} />
          </button>
          
          <button 
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={handleNotificationsClick}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="hidden sm:flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">SA</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;