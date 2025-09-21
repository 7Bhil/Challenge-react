import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import leaderboardData from '../data/leaderboard';

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [filter, setFilter] = useState('score'); // 'score', 'rank', 'general_rank'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' ou 'desc'

  useEffect(() => {
    setRankings(leaderboardData);
  }, []);

  const handleSort = (column) => {
    if (filter === column) {
      // Inverser l'ordre de tri si on clique sur la même colonne
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Sinon, trier par la nouvelle colonne par ordre descendant par défaut
      setFilter(column);
      setSortOrder('desc');
    }
  };

  const filteredRankings = [...rankings].sort((a, b) => {
    const aValue = a[filter] || 999;
    const bValue = b[filter] || 999;
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getMedal = (position) => {
    switch (position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return position;
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-xl sm:text-3xl font-bold text-purple-800 mb-4 sm:mb-6 flex justify-between items-center">
        Classement Général
        <Link
          to="/"
          className="text-red-600 text-base sm:text-lg hover:text-gray-800"
        >
          Retour à l'accueil
        </Link>
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th
                className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('challenger_id')}
              >
                Participant
              </th>
              <th
                className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('score')}
              >
                Score
              </th>
              <th
                className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('rank')}
              >
                Rang actuel
              </th>
              <th
                className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('general_rank')}
              >
                Rang général
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRankings.map((ranking, index) => (
              <tr key={ranking.id} className="hover:bg-gray-50">
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{getMedal(index + 1)}</td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">Utilisateur #{ranking.challenger_id}</td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">{ranking.score}/20</td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">#{ranking.rank}</td>
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">#{ranking.general_rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
