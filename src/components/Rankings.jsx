import { useState, useEffect } from 'react';
import RankingItem from './RankingItem';
import { Link } from 'react-router-dom';
// On importe directement les données
import leaderboardData from '../data/leaderboard';

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      let rankingsArray = [];
      if (Array.isArray(leaderboardData)) {
        rankingsArray = leaderboardData;
      } else if (leaderboardData.rankings && Array.isArray(leaderboardData.rankings)) {
        rankingsArray = leaderboardData.rankings;
      } else if (leaderboardData.data && Array.isArray(leaderboardData.data)) {
        rankingsArray = leaderboardData.data;
      } else {
        throw new Error('Format de données inattendu');
      }

      // Trier par score décroissant et prendre les 3 premiers
      const topThreeByScore = rankingsArray
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setRankings(topThreeByScore);
    } catch (error) {
      console.error('Erreur lors du chargement du classement:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-900">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-900">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-100">
          Top 3 des <span className="text-red-600">meilleurs scores</span>
        </h2>
        <Link
          to="/leaderboard"
          className="text-red-400 hover:text-red-500 font-medium flex items-center transition-colors duration-300 group"
        >
          Voir le classement complet
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {rankings.length === 0 ? (
        <div className="text-center py-10 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
          <p className="text-gray-300">Aucun classement disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rankings.map((ranking, index) => (
            <RankingItem key={ranking.id} ranking={ranking} position={index + 1} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Rankings;