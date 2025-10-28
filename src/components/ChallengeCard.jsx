import { Link } from 'react-router-dom';

const ChallengeCard = ({ challenge }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'en cours':
        return 'bg-red-500/20 text-red-400 border border-red-500/50';
      case 'à venir':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/50';
      case 'terminé':
        return 'bg-gray-700/30 text-gray-300 border border-gray-600/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/50';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'facile':
        return 'text-green-400';
      case 'moyenne':
        return 'text-yellow-400';
      case 'difficile':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:scale-105">
      <div className="p-6">
        {/* Titre + statut */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-purple-400">{challenge.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(challenge.status)}`}>
            {challenge.status}
          </span>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm font-medium text-purple-400">Début :</span>
            <p className="text-gray-300 text-sm">
              {new Date(challenge.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-purple-400">Fin :</span>
            <p className="text-gray-300 text-sm">
              {new Date(challenge.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-red-400">Difficulté :</span>
            <p className={`font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-purple-400">Technologies :</span>
            <p className="text-gray-300 text-sm">
              {challenge.technologies?.join(', ') || 'Aucune'}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm line-clamp-2">
            {challenge.description}
          </p>
        </div>

        {/* Bouton */}
        <Link to={`/challenge/${challenge._id}`}>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-105">
            Voir le défi
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
