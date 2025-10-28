import { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard.jsx';
import { Link } from 'react-router-dom';
import api from '../service/api'; // Import ton instance axios

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
  try {
    setLoading(true);
    console.log('🔄 Chargement des challenges...');
    
    const response = await api.get('/challenges');
    console.log('✅ Réponse API:', response.data);
    
    if (response.data.success) {
      setChallenges(response.data.data);
    } else {
      setError('Erreur dans la réponse API');
    }
  } catch (error) {
    console.error('❌ Erreur API:', error.response?.data || error.message);
    setError('Erreur de chargement des défis: ' + (error.response?.data?.message || error.message));
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-10">
          <p className="text-gray-300">Chargement des défis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-10 bg-gray-800/50 rounded-xl border border-red-500/30 backdrop-blur-sm">
          <p className="text-red-400 mb-4">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto px-4 py-12 bg-gray-900">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-100">
          Défis <span className="text-red-600">en cours</span>
        </h2>
        <Link 
          to="/admin/create-challenge" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Créer un défi
        </Link>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 backdrop-blur-sm">
          <p className="text-gray-300">Aucun défi en cours pour le moment.</p>
          <p className="text-gray-400 text-sm mt-2">Revenez bientôt pour découvrir de nouveaux défis!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ChallengesList;