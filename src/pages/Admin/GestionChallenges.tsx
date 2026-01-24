import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { challengeService } from '../../service/api';

// Définition de l'interface pour un challenge (alignée avec le backend)
interface Challenge {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  difficulty: string;
  technologies: string[];
  status: string;
  participantCount: number;
}

const AdminChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await challengeService.getAll();
      if (response.success) {
        setChallenges(response.data);
        setFilteredChallenges(response.data);
      }
    } catch (err) {
      console.error("Erreur chargement challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(challenge => 
        challenge.title.toLowerCase().includes(term.toLowerCase()) ||
        challenge.description.toLowerCase().includes(term.toLowerCase()) ||
        challenge.technologies?.join(', ').toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChallenges(filtered);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">Actif</span>;
      case 'upcoming':
        return <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">À venir</span>;
      case 'completed':
        return <span className="bg-gray-500/20 text-gray-400 text-xs font-bold px-3 py-1 rounded-full border border-gray-500/20">Terminé</span>;
      default:
        return <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20">{status}</span>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
      case 'easy':
        return <span className="text-green-400 text-xs font-bold">● Facile</span>;
      case 'Moyen':
      case 'medium':
        return <span className="text-yellow-400 text-xs font-bold">● Moyen</span>;
      case 'Difficile':
      case 'hard':
        return <span className="text-red-400 text-xs font-bold">● Difficile</span>;
      default:
        return <span className="text-gray-400 text-xs font-bold">● {difficulty}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400 font-medium">Récupération de vos défis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 border-b border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent italic">Mes Challenges</h1>
                <p className="mt-2 text-gray-400 font-medium">Pilotez et suivez l'évolution de vos créations</p>
              </div>
              <Link
                to="/creation-challenge"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                <FaPlus className="mr-2" /> Nouveau Challenge
              </Link>
            </div>
          </div>

          {/* Recherche */}
          <div className="p-6 bg-gray-900/50 border-b border-gray-800">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                placeholder="Filtrer mes défis..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-950/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Défi</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Niveau</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Stack</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Statut</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Participants</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredChallenges.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <p className="text-gray-500 italic text-lg">Aucun défi trouvé</p>
                    </td>
                  </tr>
                ) : (
                  filteredChallenges.map((challenge) => (
                    <tr key={challenge._id} className="hover:bg-gray-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{challenge.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs mt-1">{challenge.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getDifficultyBadge(challenge.difficulty)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {challenge.technologies?.map(tech => (
                            <span key={tech} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(challenge.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {challenge.participantCount || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/edit-challenge/${challenge._id}`}
                            className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                            title="Modifier"
                          >
                            <FaEdit size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChallenges;