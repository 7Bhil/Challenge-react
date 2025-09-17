import React from 'react';
import { Users } from 'lucide-react';

const UsersPage = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Users className="mr-2 text-blue-500" size={24} />
        Gestion des Utilisateurs
      </h2>
      <div className="text-gray-600">
        Interface de gestion des utilisateurs en cours de développement...
      </div>
    </div>
  );
};

export default UsersPage;