import React from 'react';
import { Bell } from 'lucide-react';
import Deadlines from '../components/Dashboard/Deadlines';
import Notifications from '../components/Dashboard/Notifications';

const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Bell className="mr-2 text-blue-500" size={24} />
          Centre de notifications
        </h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications Récentes</h3>
            <Notifications expanded={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochaines Échéances</h3>
            <Deadlines expanded={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;