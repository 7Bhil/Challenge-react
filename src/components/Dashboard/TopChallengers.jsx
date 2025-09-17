import React from 'react';
import { Award } from 'lucide-react';

const TopChallengers = ({ expanded = false }) => {
  const topChallengers = [
    { rank: 1, name: "Alex Martin", points: 9850, avatar: "AM" },
    { rank: 2, name: "Sophie Chen", points: 9420, avatar: "SC" },
    { rank: 3, name: "Lucas Dubois", points: 8950, avatar: "LD" }
  ];

  if (expanded) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="mr-2 text-yellow-500" size={20} />
          Classement des Challengers
        </h3>
        <div className="space-y-4">
          {topChallengers.map((challenger) => (
            <div key={challenger.rank} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                challenger.rank === 1 ? 'bg-yellow-500' :
                challenger.rank === 2 ? 'bg-gray-400' :
                'bg-orange-600'
              }`}>
                {challenger.rank}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{challenger.name}</p>
                <p className="text-sm text-gray-500">{challenger.points.toLocaleString()} points</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-800">
                {challenger.avatar}
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
        <Award className="mr-2 text-yellow-500" size={20} />
        Top 3 Challengers
      </h3>
      <div className="space-y-4">
        {topChallengers.map((challenger) => (
          <div key={challenger.rank} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
              challenger.rank === 1 ? 'bg-yellow-500' :
              challenger.rank === 2 ? 'bg-gray-400' :
              'bg-orange-600'
            }`}>
              {challenger.rank}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{challenger.name}</p>
              <p className="text-sm text-gray-500">{challenger.points.toLocaleString()} points</p>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
              {challenger.avatar}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChallengers;