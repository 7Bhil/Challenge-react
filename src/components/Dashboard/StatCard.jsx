import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  // Capitaliser le nom de l'icône pour éviter les erreurs
  const IconComponent = icon;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <IconComponent size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;