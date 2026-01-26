import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  ChevronRight, 
  CheckCircle, 
  Search,
  Zap,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { challengeService } from '../../service/api';

const JuryDashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const data = await challengeService.getAll();
      if (data.success) {
        setChallenges(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const isJudgeFor = (challenge) => {
    return challenge.judges?.some(j => j === user.id || j === user._id || (j._id && j._id === user.id));
  };

  const handleVolunteer = async (challengeId) => {
    try {
      const resp = await challengeService.volunteer(challengeId);
      if (resp.success) {
        fetchChallenges(); // Refresh
      }
    } catch (error) {
      console.error('Failed to volunteer:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'acceptation');
    }
  };

  const filteredChallenges = challenges.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Espace <span className="text-yellow-400">Jury</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Choisissez les challenges que vous souhaitez évaluer selon votre expertise.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Rechercher un challenge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-gray-900 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 w-full md:w-80"
            />
          </div>
        </div>

        {/* Categories / Sections maybe? For now just a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => {
              const assigned = isJudgeFor(challenge);
              return (
                <div 
                  key={challenge._id}
                  className={`group relative bg-gray-900/40 border transition-all duration-300 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/5 ${assigned ? 'border-yellow-500/30' : 'border-gray-800 hover:border-gray-700'}`}
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${assigned ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700 group-hover:text-gray-300'}`}>
                        <Star className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          challenge.difficulty === 'hard' || challenge.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400' :
                          challenge.difficulty === 'medium' || challenge.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {challenge.difficulty}
                        </span>
                        {assigned && (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                            <CheckCircle className="w-3.5 h-3.5" /> Juge Actif
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {challenge.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {challenge.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {challenge.technologies?.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] font-bold text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {assigned ? (
                      <Link 
                        to={`/jury/submissions/${challenge._id}`}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-black rounded-2xl transition-all shadow-lg shadow-yellow-500/20"
                      >
                        Noter les soumissions
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    ) : (
                      <button 
                        onClick={() => handleVolunteer(challenge._id)}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl transition-all border border-gray-700"
                      >
                        Devenir Jury pour ce défi
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <Zap className="w-16 h-16 text-gray-700 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">Aucun challenge disponible</h3>
              <p className="text-gray-600 mt-2">Revenez plus tard pour de nouveaux défis à évaluer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JuryDashboard;
