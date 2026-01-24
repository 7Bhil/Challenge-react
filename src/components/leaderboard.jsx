import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService, challengeService, getRoleAvatar } from '../service/api';
import ChallengeLeaderboard from './ChallengeLeaderboard';
import { 
  Trophy, 
  ArrowLeft, 
  Medal, 
  Search, 
  User as UserIcon,
  Flame,
  Star,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  Users as UsersIcon
} from 'lucide-react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("general"); // "general" or "challenges"
  const [rankings, setRankings] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Charger le classement général
        const rankRes = await userService.getLeaderboard();
        if (rankRes.success) setRankings(rankRes.data);

        // Charger les challenges archivés pour le sélecteur (ceux finis ou avec deadline passée)
        const chalRes = await challengeService.getAll({ type: 'archived' });
        if (chalRes.success) {
          setChallenges(chalRes.data);
          if (chalRes.data.length > 0) setSelectedChallenge(chalRes.data[0]._id);
        }
      } catch (err) {
        console.error("Erreur chargement:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getRankBadge = (index) => {
    switch (index) {
      case 0: return <div className="w-8 h-8 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center font-bold border border-yellow-400/30">1</div>;
      case 1: return <div className="w-8 h-8 bg-gray-300/20 text-gray-300 rounded-full flex items-center justify-center font-bold border border-gray-300/30">2</div>;
      case 2: return <div className="w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center font-bold border border-orange-500/30">3</div>;
      default: return <div className="w-8 h-8 text-gray-500 flex items-center justify-center font-medium">{index + 1}</div>;
    }
  };

  const filteredRankings = rankings.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12 pt-24">
      <div className="max-w-5xl mx-auto px-5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Retour Accueil</span>
            </Link>
            <h1 className="text-4xl font-extrabold flex items-center gap-4">
              <Trophy className="w-10 h-10 text-yellow-500" />
              {activeTab === "general" ? "Classement Général" : "Classements Défis"}
            </h1>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-gray-900/50 p-1 rounded-2xl border border-gray-800">
            <button 
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "general" ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-gray-400 hover:text-white'}`}
            >
              <UsersIcon className="w-4 h-4" />
              Général
            </button>
            <button 
              onClick={() => setActiveTab("challenges")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "challenges" ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
              Par Défi
            </button>
          </div>
        </div>

        {activeTab === "general" ? (
          <>
            {/* Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {rankings.slice(0, 3).map((user, i) => (
                  <Link 
                    key={user._id || i} 
                    to={`/profile/${user._id || user.id}`}
                    className={`relative p-8 rounded-3xl border ${i === 0 ? 'bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20' : 'bg-gray-900/50 border-gray-800'} overflow-hidden block transition-all hover:scale-[1.02] hover:border-purple-500/30 group`}
                  >
                     {i === 0 && <Star className="absolute top-4 right-4 w-6 h-6 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors" />}
                     <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <img 
                              src={getRoleAvatar(user)} 
                              className="w-20 h-20 rounded-full border-2 border-gray-800 shadow-lg group-hover:border-purple-500/50 transition-all" 
                              alt={user.name} 
                            />
                           <div className={`absolute -bottom-2 right-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-gray-950 ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-300 text-black' : 'bg-orange-600 text-white'}`}>
                             {i + 1}
                           </div>
                        </div>
                        <div className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">{user.name}</div>
                        <div className="text-sm text-gray-400 mb-4">{user.points} points</div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-950 rounded-full border border-gray-800 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                           Lvl {user.level || 1}
                        </div>
                     </div>
                  </Link>
                ))}
            </div>

            {/* General List Search */}
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Rechercher un membre dans le classement général..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg"
              />
            </div>

            {/* General List Table */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-900/80 border-b border-gray-800">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Rang</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Participant</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Niveau</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {filteredRankings.length > 0 ? filteredRankings.map((user, index) => (
                    <tr key={user._id || index} className="hover:bg-gray-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        {getRankBadge(index)}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/profile/${user._id}`} className="flex items-center gap-3 group/user">
                           <img 
                             src={getRoleAvatar(user)} 
                             className="w-10 h-10 rounded-full border border-gray-800 group-hover/user:border-purple-500/50 transition-all shadow-sm"
                             alt={user.name} 
                           />
                          <div>
                            <div className="font-bold text-white group-hover/user:text-purple-400 transition-colors">{user.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1.5">
                               <Flame className="w-3 h-3 text-orange-500" />
                               {user.streak || 0} jours de streak
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm font-medium text-gray-400">Niveau {user.level || 1}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-lg font-black text-white">{user.points || 0}</div>
                        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Points</div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan="4" className="px-6 py-20 text-center text-gray-500 italic">
                          Aucun membre trouvé pour "{searchTerm}"
                       </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Challenge Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.map((challenge) => (
                <button
                  key={challenge._id}
                  onClick={() => setSelectedChallenge(challenge._id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedChallenge === challenge._id
                      ? "bg-purple-600/20 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.1)]"
                      : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      challenge.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {challenge.status === 'completed' ? 'Terminé' : 'En cours'}
                    </span>
                    <span className="text-[10px] text-gray-500 italic">
                      {new Date(challenge.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className={`font-bold transition-colors ${selectedChallenge === challenge._id ? 'text-purple-300' : 'text-white'}`}>
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {challenge.difficulty} • {challenge.technologies?.join(', ')}
                  </p>
                </button>
              ))}
            </div>

            {/* Selected Challenge Leaderboard */}
            {selectedChallenge ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ChallengeLeaderboard challengeId={selectedChallenge} />
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-900/30 border border-gray-800 border-dashed rounded-3xl">
                <p className="text-gray-500">Sélectionnez un challenge pour voir son classement.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

