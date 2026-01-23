import { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard.jsx';
import { 
  Code, 
  Search, 
  Filter, 
  Trophy, 
  Rocket, 
  Zap, 
  Brain,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { challengeService } from '../service/api';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

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
      setError('Erreur de chargement des défis');
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || c.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-mono animate-pulse text-sm">Initialisation des environnements...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">
              <Zap className="w-3 h-3" />
              Arena active
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight">
              Défis <span className="text-blue-500">Mondiaux</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Poussez vos limites techniques, affrontez les meilleurs développeurs et remportez des prix exclusifs.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/creation-challenge" 
              className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Publier un défi
            </Link>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-2 rounded-2xl mb-12 flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Rechercher par titre, technologie..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center gap-2 px-2">
            {[ "All", "Facile", "Moyen", "Difficile" ].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilter(diff)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  filter === diff 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                }`}
              >
                {diff === "All" ? "Tous" : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map(challenge => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/30 border border-dashed border-gray-800 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
              <Search className="w-8 h-8 text-gray-700" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Aucun défi trouvé</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              Nous n'avons trouvé aucun défi correspondant à vos critères de recherche. Essayez d'autres mots-clés ou filtres !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesList;