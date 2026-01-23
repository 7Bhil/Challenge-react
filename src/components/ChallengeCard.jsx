import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Trophy, 
  ChevronRight, 
  Clock,
  Sparkles
} from 'lucide-react';

const ChallengeCard = ({ challenge }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'moyen': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'difficile': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const isNew = new Date(challenge.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
      
      <div className="relative p-8">
        {/* Status & Badge */}
        <div className="flex justify-between items-center mb-6">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
          {isNew && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Nouveau</span>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors leading-tight">
          {challenge.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {challenge.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 border-t border-gray-800 pt-6">
          <div className="flex items-center gap-3 text-gray-500">
            <Users className="w-4 h-4 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-tighter font-bold">Participants</span>
              <span className="text-xs text-gray-300 font-mono">{challenge.participantCount || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <Calendar className="w-4 h-4 text-purple-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-tighter font-bold">Deadline</span>
              <span className="text-xs text-gray-300 font-mono">
                {new Date(challenge.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-500 col-span-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-tighter font-bold">Récompense</span>
              <span className="text-xs text-gray-300 font-bold tracking-tight">
                {challenge.xpPoints || 0} XP
                {challenge.financialReward > 0 && ` & ${challenge.financialReward.toLocaleString()} FCFA`}
              </span>
            </div>
          </div>
        </div>

        {/* Action */}
        <Link 
          to={`/challenge/${challenge._id}`}
          className="flex items-center justify-center gap-2 w-full py-4 bg-gray-800 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all group/btn shadow-inner"
        >
          Rejoindre l'arène
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
