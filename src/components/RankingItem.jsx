import { Link } from 'react-router-dom';

const RankingItem = ({ ranking, position }) => {
  const getMedal = (position) => {
    switch (position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${position}`;
    }
  };

  const getRankColor = (position) => {
    switch (position) {
      case 1: return 'bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-500/50';
      case 2: return 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-500/50';
      case 3: return 'bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-500/50';
      default: return 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700';
    }
  };

  return (
    <div
      className={`rounded-xl border-2 p-6 ${getRankColor(position)} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      {/* En-tête */}
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4">{getMedal(position)}</span>
        <div>
          <h3 className="text-xl font-bold text-purple-400">
            Participant #{ranking.challenger_id}
          </h3>
          <p className="text-sm text-gray-400">
            Score :{" "}
            <span className="text-red-400 font-semibold">
              {ranking.score}/20
            </span>
          </p>
        </div>
      </div>

      {/* Rang général */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-sm border border-gray-700/50">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Rang général :</span>
          <span className="text-2xl font-bold text-purple-400">
            #{ranking.general_rank}
          </span>
        </div>
      </div>

      {/* Rang actuel */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Rang actuel :</span>
          <span className="font-medium text-gray-300">#{ranking.rank}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Dernière soumission :</span>
          <span className="text-sm text-gray-300">
            {new Date(ranking.submission_date).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4 backdrop-blur-sm">
        <span className="block text-sm font-medium text-purple-400 mb-2">
          Feedback :
        </span>
        <p className="text-gray-300 italic text-sm">{ranking.feedback}</p>
      </div>

      {/* Bouton profil */}
      <Link
        to={`/profile/${ranking.challenger_id}`}
        className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
      >
        Voir le profil
      </Link>
    </div>
  );
};

export default RankingItem;
