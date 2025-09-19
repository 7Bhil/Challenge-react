import { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard';
import { Link } from 'react-router-dom';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/data/challenge.json');
        
        if (!response.ok) {
          throw new Error('Impossible de charger les défis');
        }
        
        const data = await response.json();
        
        // Vérifier si les données sont un tableau
        let challengesArray = [];
        if (Array.isArray(data)) {
          challengesArray = data;
        } else if (data.challenges && Array.isArray(data.challenges)) {
          challengesArray = data.challenges;
        } else if (data.data && Array.isArray(data.data)) {
          challengesArray = data.data;
        } else {
          throw new Error('Format de données inattendu');
        }
        
        // Filtrer pour n'afficher que les défis "en cours"
        const ongoingChallenges = challengesArray.filter(
          challenge => challenge.status === 'en cours'
        );
        
        setChallenges(ongoingChallenges);
      } catch (error) {
        console.error('Erreur lors du chargement des défis:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

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
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-purple-800">Défis en cours</h2>
        <Link 
          to="/all-challenges" 
          className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
        >
          Voir tous les défis
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {challenges.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-600">Aucun défi en cours pour le moment.</p>
          <p className="text-gray-500 text-sm mt-2">Revenez bientôt pour découvrir de nouveaux défis!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ChallengesList;