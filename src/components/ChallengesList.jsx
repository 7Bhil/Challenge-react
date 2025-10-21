import { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard';
import { Link } from 'react-router-dom';
// Import direct du fichier JSON depuis src/data/
import challengesData from '../data/challenge.js';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Vérifier si les données sont un tableau
      let challengesArray = [];
      if (Array.isArray(challengesData)) {
        challengesArray = challengesData;
      } else if (challengesData.challenges && Array.isArray(challengesData.challenges)) {
        challengesArray = challengesData.challenges;
      } else if (challengesData.data && Array.isArray(challengesData.data)) {
        challengesArray = challengesData.data;
      } else {
        throw new Error('Format de données inattendu');
      }

      // Filtrer pour n'afficher que les défis "en cours"
      const ongoingChallenges = challengesArray.filter(
        challenge => challenge.status === 'en cours'
      );

      setChallenges(ongoingChallenges);
    } catch (error) {
      console.error('Erreur lors du traitement des défis:', error);
      setError(error.message);
    }
  }, []);

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
    <section className="container mx-auto px-4 py-12 bg-gray-900">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-100">
          Défis <span className="text-red-600">en cours</span>
        </h2>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-10 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
          <p className="text-gray-300">Aucun défi en cours pour le moment.</p>
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