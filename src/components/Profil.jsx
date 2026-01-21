import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userService, authService } from '../service/api';
import { 
  User, 
  Mail, 
  Trophy, 
  Zap, 
  Brain, 
  Star, 
  Calendar, 
  ArrowLeft,
  Settings,
  Shield,
  Rocket,
  Flame,
  Code
} from 'lucide-react';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = authService.getCurrentUser();
  const isOwnProfile = currentUser && (currentUser.id === userId || currentUser._id === userId);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await userService.getById(userId);
        if (response.success) {
          setUser(response.data);
        } else {
          throw new Error(response.message || 'Utilisateur non trouvé');
        }
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-400" />
        </div>
        <p className="mt-4 text-gray-400 font-medium animate-pulse">Chargement du profil...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Oups !</h2>
          <p className="text-gray-400 mb-6">{error || 'Utilisateur non trouvé'}</p>
          <Link 
            to="/leaderboard" 
            className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au classement
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12 pt-24">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link 
            to="/leaderboard" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Retour au classement</span>
          </Link>
          
          {isOwnProfile && (
            <Link 
              to="/settings" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/20 transition-all font-medium"
            >
              <Settings className="w-4 h-4" />
              Modifier mon profil
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main User Card (Left/Top) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 sticky top-24">
              <div className="relative mb-6 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="relative w-32 h-32 rounded-full mx-auto border-4 border-gray-900 shadow-2xl "
                />
                <div className="absolute bottom-0 right-1/2 translate-x-16 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-gray-900">
                  Lvl {user.level || 1}
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-medium mb-3">
                  <Shield className="w-3 h-3" />
                  <span className="uppercase tracking-wider">{user.role}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed italic">
                  "{user.passion || 'Passionné de technologie et de développement'}"
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-950/50 rounded-2xl border border-gray-800/50">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Email</div>
                    <div className="text-sm truncate max-w-[180px]">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-950/50 rounded-2xl border border-gray-800/50">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Points Totaux</div>
                    <div className="text-sm font-bold text-white">{user.points || 0} pts</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-950/50 rounded-2xl border border-gray-800/50">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Streak Actuel</div>
                    <div className="text-sm font-bold text-white">{user.streak || 0} jours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Stats & History (Right) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Défis Relevés', value: '12', icon: Code, color: 'blue' },
                { label: 'Solutions Approuvées', value: '8', icon: Rocket, color: 'purple' },
                { label: 'Rang Global', value: '#15', icon: Trophy, color: 'orange' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl relative overflow-hidden group">
                   <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-4`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Participation History Placeholder */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Historique des participations
                </h2>
                <div className="text-xs text-gray-500 font-medium">Bientôt disponible</div>
              </div>
              
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-800">
                  <Star className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-white font-bold mb-2">Pas encore d'activité publique</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                  L'historique détaillé des challenges et des soumissions sera disponible très prochainement.
                </p>
                <Link to="/challenges" className="inline-flex mt-6 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  Parcourir les challenges →
                </Link>
              </div>
            </div>
            
            {/* Badges/Achievements Placeholder */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6">
               <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Badges & Succès
                </h2>
                <div className="flex flex-wrap gap-4 opacity-50 grayscale">
                  {[1, 2, 3, 4, 5].map(b => (
                    <div key={b} className="w-12 h-12 bg-gray-950 rounded-2xl border border-gray-800 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-gray-700" />
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

