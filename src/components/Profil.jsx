import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Import direct des données
import usersData from '../data/user';
import leaderboardData from '../data/leaderboard';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userRankings, setUserRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Charger les données utilisateurs
      let usersArray = [];
      if (Array.isArray(usersData)) {
        usersArray = usersData;
      } else if (usersData.users && Array.isArray(usersData.users)) {
        usersArray = usersData.users;
      } else {
        throw new Error('Format de données utilisateur inattendu');
      }

      const foundUser = usersArray.find(u => u.id === parseInt(userId));
      if (!foundUser) throw new Error('Utilisateur non trouvé');
      setUser(foundUser);

      // Charger les classements liés à l'utilisateur
      let rankingsArray = [];
      if (Array.isArray(leaderboardData)) {
        rankingsArray = leaderboardData;
      } else if (leaderboardData.rankings && Array.isArray(leaderboardData.rankings)) {
        rankingsArray = leaderboardData.rankings;
      } else {
        throw new Error('Format de données classement inattendu');
      }

      const userRankings = rankingsArray.filter(r => r.challenger_id === parseInt(userId));
      setUserRankings(userRankings);

    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

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
          <Link to="/leaderboard" className="text-purple-600 hover:text-purple-800">
            Retour au classement
          </Link>
         
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link 
          to="/leaderboard" 
          className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour au classement
        </Link>
         <Link to="/" className="text-red-600 hover:text-purple-800">
            Retour a l'acceuil
          </Link>
      </div>

      {/* En-tête du profil */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-800">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name || `Utilisateur #${user.id}`}</h1>
            <p className="text-gray-600">{user.email || 'Email non disponible'}</p>
            <div className="flex space-x-4 mt-2">
              {user.skills && user.skills.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Compétences:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Meilleur score</h3>
          <p className="text-3xl font-bold text-purple-600">
            {userRankings.length > 0 ? Math.max(...userRankings.map(r => r.score)) : 0}/20
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Défis complétés</h3>
          <p className="text-3xl font-bold text-purple-600">{userRankings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rang général moyen</h3>
          <p className="text-3xl font-bold text-purple-600">
            {userRankings.length > 0 
              ? `#${Math.round(userRankings.reduce((sum, r) => sum + r.general_rank, 0) / userRankings.length)}` 
              : 'N/A'
            }
          </p>
        </div>
      </div>

      {/* Historique des participations */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Historique des participations</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Défi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userRankings.map((ranking) => (
              <tr key={ranking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Défi #{ranking.challenge_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {ranking.score}/20
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{ranking.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(ranking.submission_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {userRankings.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">Aucune participation enregistrée.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
