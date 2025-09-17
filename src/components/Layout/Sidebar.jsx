import React from 'react';
import { 
  Home, 
  Users, 
  Trophy, 
  Shield, 
  Settings,
  X,
  Bell
} from 'lucide-react';
import MenuItem from './MenuItem';

const Sidebar = React.forwardRef(({ activeMenu, sidebarOpen, setSidebarOpen, handleMenuClick }, ref) => {
  const menuItems = [
    { icon: Home, label: "Accueil", id: "accueil" },
    { icon: Users, label: "Utilisateurs", id: "utilisateurs" },
    { icon: Trophy, label: "Challenges", id: "challenges" },
    { icon: Shield, label: "Jurys", id: "jurys" },
    { icon: Settings, label: "Paramètres", id: "parametres" },
    { icon: Bell, label: "Notifications", id: "notifications" }
  ];

  return (
    <aside 
      ref={ref}
      className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-4 md:p-6 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold">Challenge Platform</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Super Admin</p>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              id={item.id}
              isActive={activeMenu === item.id}
              onClick={handleMenuClick}
            />
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Super Admin</p>
            <p className="text-xs text-gray-400">admin@platform.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;