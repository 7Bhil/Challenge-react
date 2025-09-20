import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import leaderboardData from '../data/leaderboard'; // ✅ import direct

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [filter] = useState('all'); // 'all', 'current', 'general'

  useEffect(() => {
    // ✅ pas besoin de fetch
    setRankings(leaderboardData);
  }, []);

  const filteredRankings = [...rankings].sort((a, b) => {
    if (filter === 'general') {
      return (a.general_rank || 999) - (b.general_rank || 999);
    } else if (filter === 'current') {
      return (a.rank || 999) - (b.rank || 999);
    } else {
      return b.score - a.score;
    }
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Classement Général
        <Link to="/" className="text-red-600 text-5x float-end hover:text-text-800">
            Retour à l'accueil
          </Link>
      </h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rang actuel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rang général</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRankings.map((ranking, index) => (
              <tr key={ranking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{getMedal(index + 1)}</td>
                <td className="px-6 py-4">Utilisateur #{ranking.challenger_id}</td>
                <td className="px-6 py-4">{ranking.score}/20</td>
                <td className="px-6 py-4">#{ranking.rank}</td>
                <td className="px-6 py-4">#{ranking.general_rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
