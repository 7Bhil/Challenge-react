import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Settings className="mr-2 text-gray-500" size={24} />
        Paramètres Système
      </h2>
      <div className="text-gray-600">
        Interface de paramétrage en cours de développement...
      </div>
    </div>
  );
};

export default SettingsPage;