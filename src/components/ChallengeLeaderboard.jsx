import { useState, useEffect } from 'react';
import { challengeService, getRoleAvatar } from '../service/api';

const ChallengeLeaderboard = ({ challengeId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await challengeService.getLeaderboard(challengeId);
        if (response.success) {
          setLeaderboard(response.data);
        }
      } catch (error) {
        console.error('Erreur chargement leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchLeaderboard();
    }
  }, [challengeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
        <p className="text-gray-400">Aucun participant classé pour le moment.</p>
        <p className="text-sm text-gray-500 mt-2">Soyez le premier à soumettre une solution !</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-700 bg-gray-800/50">
        <h3 className="text-xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Classement du défi
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Rang</th>
              <th className="px-6 py-4 font-semibold">Utilisateur</th>
              <th className="px-6 py-4 font-semibold">Score Final</th>
              <th className="px-6 py-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {leaderboard.map((submission, index) => {
              const rank = index + 1;
              const isFirst = rank === 1;
              const isSecond = rank === 2;
              const isThird = rank === 3;
              
              return (
                <tr key={submission._id} className="hover:bg-gray-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {isFirst ? (
                        <span className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold border border-yellow-500/50">
                          1
                        </span>
                      ) : isSecond ? (
                        <span className="w-8 h-8 rounded-full bg-gray-400/20 text-gray-300 flex items-center justify-center font-bold border border-gray-400/50">
                          2
                        </span>
                      ) : isThird ? (
                        <span className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-600 flex items-center justify-center font-bold border border-amber-700/50">
                          3
                        </span>
                      ) : (
                        <span className="text-gray-500 font-medium ml-2">{rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={getRoleAvatar(submission.user)} 
                        alt={submission.user?.name} 
                        className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-purple-500 transition-colors"
                      />
                      <div className="ml-3">
                        <p className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                          {submission.user?.name}
                        </p>
                        <p className="text-xs text-gray-400">Niveau {submission.user?.level || 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {submission.finalScore?.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/20</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChallengeLeaderboard;
