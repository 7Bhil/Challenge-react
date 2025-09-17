import React from 'react';
import { Trophy } from 'lucide-react';

const Challenges = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Trophy className="mr-2 text-yellow-500" size={24} />
        Gestion des Challenges
      </h2>
      <div className="text-gray-600">
        Interface de gestion des challenges en cours de développement...
      </div>
    </div>
  );
};

export default Challenges;