import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = ({ expanded = false }) => {
  const notifications = [
    { text: "Nouveau challenge soumis par TechCorp", time: "Il y a 5 min", type: "info" },
    { text: "Jury en attente d'affectation", time: "Il y a 15 min", type: "warning" },
    { text: "Challenger signalé pour tricherie", time: "Il y a 1h", type: "alert" }
  ];

  if (expanded) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start">
                <div className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                  notification.type === 'info' ? 'bg-blue-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm md:text-base text-gray-900">{notification.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bell className="mr-2 text-blue-500" size={20} />
        Notifications Récentes
      </h3>
      <div className="space-y-4">
        {notifications.slice(0, 3).map((notification, index) => (
          <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
            <p className="text-xs md:text-sm text-gray-900">{notification.text}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;