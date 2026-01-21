import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../service/api';
import { 
  Trophy, 
  ArrowLeft, 
  Medal, 
  Search, 
  User as UserIcon,
  Flame,
  Star,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await userService.getLeaderboard();
        if (response.success) {
          setRankings(response.data);
        }
      } catch (err) {
        console.error("Erreur chargement leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
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
              Classement Général
            </h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Rechercher un membre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full md:w-64 transition-all"
            />
          </div>
        </div>

        {/* Podium / Stats Summary (Optional feature to wow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {rankings.slice(0, 3).map((user, i) => (
             <div key={user._id || i} className={`relative p-8 rounded-3xl border ${i === 0 ? 'bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20' : 'bg-gray-900/50 border-gray-800'} overflow-hidden`}>
                {i === 0 && <Star className="absolute top-4 right-4 w-6 h-6 text-yellow-500/20" />}
                <div className="flex flex-col items-center text-center">
                   <div className="relative mb-4">
                      <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-20 h-20 rounded-full border-2 border-gray-800" alt={user.name} />
                      <div className={`absolute -bottom-2 right-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-gray-950 ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-300 text-black' : 'bg-orange-600 text-white'}`}>
                        {i + 1}
                      </div>
                   </div>
                   <div className="font-bold text-lg mb-1">{user.name}</div>
                   <div className="text-sm text-gray-400 mb-4">{user.points} points</div>
                   <div className="flex items-center gap-2 px-3 py-1 bg-gray-950 rounded-full border border-gray-800 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                      Lvl {user.level || 1}
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* List */}
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
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        className="w-10 h-10 rounded-full border border-gray-800 group-hover/user:border-purple-500/50 transition-colors"
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
      </div>
    </div>
  );
};

export default Leaderboard;

