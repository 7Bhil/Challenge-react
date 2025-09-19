import { Link } from 'react-router-dom';

const RankingItem = ({ ranking, position }) => {
  const getMedal = (position) => {
    switch(position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${position}`;
    }
  };

  const getRankColor = (position) => {
    switch(position) {
      case 1: return 'bg-yellow-100 border-yellow-300';
      case 2: return 'bg-gray-100 border-gray-300';
      case 3: return 'bg-orange-100 border-orange-300';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl border-2 p-6 ${getRankColor(position)}`}>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-4">{getMedal(position)}</span>
        <div>
          <h3 className="text-xl font-bold text-purple-800">Participant #{ranking.challenger_id}</h3>
          <p className="text-sm text-gray-600">Score: {ranking.score}/20</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Rang général:</span>
          <span className="text-xl font-bold text-purple-700">#{ranking.general_rank}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Rang actuel:</span>
          <span className="font-medium">#{ranking.rank}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Dernière soumission:</span>
          <span className="text-sm">{new Date(ranking.submission_date).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <span className="block text-sm font-medium text-blue-800 mb-2">Feedback:</span>
        <p className="text-blue-900 italic text-sm">{ranking.feedback}</p>
      </div>
      
      <Link 
        to={`/profile/${ranking.challenger_id}`}
        className="block text-center text-purple-600 hover:text-purple-800 text-sm font-medium"
      >
        Voir le profil
      </Link>
    </div>
  );
};

export default RankingItem;