import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'current', 'general'

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch('/data/leaderboard.json');
        
        if (!response.ok) {
          throw new Error('Impossible de charger le classement');
        }
        
        const data = await response.json();
        
        let rankingsArray = [];
        if (Array.isArray(data)) {
          rankingsArray = data;
        } else if (data.rankings && Array.isArray(data.rankings)) {
          rankingsArray = data.rankings;
        } else if (data.data && Array.isArray(data.data)) {
          rankingsArray = data.data;
        } else {
          throw new Error('Format de données inattendu');
        }
        
        setRankings(rankingsArray);
      } catch (error) {
        console.error('Erreur lors du chargement du classement:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const filteredRankings = rankings
    .sort((a, b) => {
      if (filter === 'general') {
        return a.general_rank - b.general_rank;
      } else if (filter === 'current') {
        return a.rank - b.rank;
      } else {
        return b.score - a.score; // Par défaut trié par score
      }
    });

  const getMedal = (position) => {
    switch(position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return position;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800">Classement Général</h1>
        <Link 
          to="/" 
          className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour à l'accueil
        </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Meilleurs scores
          </button>
          <button
            onClick={() => setFilter('current')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'current' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Classement actuel
          </button>
          <button
            onClick={() => setFilter('general')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'general' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rang général
          </button>
        </div>
      </div>

      {/* Tableau des classements */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rang actuel
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rang général
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRankings.map((ranking, index) => (
              <tr key={ranking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-bold">
                    {getMedal(index + 1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-purple-800">
                        #{ranking.challenger_id}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Utilisateur #{ranking.challenger_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-bold">{ranking.score}/20</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{ranking.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{ranking.general_rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/profile/${ranking.challenger_id}`}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    Voir profil
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRankings.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow mt-6">
          <p className="text-gray-600">Aucun résultat trouvé.</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;