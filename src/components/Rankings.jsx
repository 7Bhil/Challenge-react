import { useState, useEffect } from 'react';
import RankingItem from './RankingItem';
import { Link } from 'react-router-dom';

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch('/data/leaderboard.json');
        
        if (!response.ok) {
          throw new Error('Impossible de charger le classement');
        }
        
        const data = await response.json();
        
        // Vérifier si les données sont un tableau
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
        
        // Trier par score décroissant et prendre les 3 premiers
        const topThreeByScore = rankingsArray
          .sort((a, b) => b.score - a.score) // Tri décroissant par score
          .slice(0, 3); // Prendre les 3 premiers
        
        setRankings(topThreeByScore);
      } catch (error) {
        console.error('Erreur lors du chargement du classement:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-purple-800">Top 3 des meilleurs scores</h2>
        <Link 
          to="/leaderboard" 
          className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
        >
          Voir le classement complet
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {rankings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-600">Aucun classement disponible pour le moment.</p>
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