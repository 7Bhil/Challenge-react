import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaUser, FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SuperAdminChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulation de données - à remplacer par un appel API réel
  useEffect(() => {
    // Dans une application réelle, ces données viendraient d'une API
    const mockChallenges = [
      {
        id: 1,
        title: 'Application de Gestion de Tâches',
        description: 'Créez une application React pour gérer vos tâches quotidiennes',
        startDate: '2023-10-01',
        endDate: '2023-10-15',
        difficulty: 'medium',
        technologies: 'React, JavaScript, CSS',
        status: 'active',
        createdBy: 'admin1',
        creatorName: 'Jean Dupont'
      },
      {
        id: 2,
        title: 'API REST avec Node.js',
        description: 'Développez une API REST complète avec Node.js et Express',
        startDate: '2023-10-05',
        endDate: '2023-10-20',
        difficulty: 'hard',
        technologies: 'Node.js, Express, MongoDB',
        status: 'upcoming',
        createdBy: 'admin2',
        creatorName: 'Marie Martin'
      },
      {
        id: 3,
        title: 'Site Portfolio',
        description: 'Concevez un site portfolio responsive avec HTML/CSS',
        startDate: '2023-09-20',
        endDate: '2023-10-05',
        difficulty: 'easy',
        technologies: 'HTML, CSS, JavaScript',
        status: 'completed',
        createdBy: 'admin1',
        creatorName: 'Jean Dupont'
      },
      {
        id: 4,
        title: 'Application de Chat en Temps Réel',
        description: 'Développez une application de chat avec Socket.io',
        startDate: '2023-10-10',
        endDate: '2023-10-30',
        difficulty: 'hard',
        technologies: 'Node.js, Socket.io, React',
        status: 'upcoming',
        createdBy: 'admin3',
        creatorName: 'Pierre Lambert'
      }
    ];

    setChallenges(mockChallenges);
    setFilteredChallenges(mockChallenges);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(challenge => 
        challenge.title.toLowerCase().includes(term.toLowerCase()) ||
        challenge.description.toLowerCase().includes(term.toLowerCase()) ||
        challenge.technologies.toLowerCase().includes(term.toLowerCase()) ||
        challenge.creatorName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChallenges(filtered);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce challenge ?')) {
      // Simulation de suppression - à remplacer par un appel API réel
      const updatedChallenges = challenges.filter(challenge => challenge.id !== id);
      setChallenges(updatedChallenges);
      setFilteredChallenges(updatedChallenges);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Actif</span>;
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">À venir</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Terminé</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Inconnu</span>;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Facile</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Moyen</span>;
      case 'hard':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Difficile</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Inconnu</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-2">Chargement des challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-purple-600 to-red-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <FaCrown className="mr-2" /> Tous les Challenges (Super Admin)
                </h1>
                <p className="mt-2">Gérez tous les challenges de la plateforme</p>
              </div>
              <Link
                to="/create-challenge"
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              >
                <FaPlus className="mr-2" /> Nouveau Challenge
              </Link>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rechercher un challenge..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Liste des challenges */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Créateur
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulté
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChallenges.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      Aucun challenge trouvé
                    </td>
                  </tr>
                ) : (
                  filteredChallenges.map((challenge) => (
                    <tr key={challenge.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{challenge.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaUser className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">{challenge.creatorName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getDifficultyBadge(challenge.difficulty)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {challenge.technologies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(challenge.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>Début: {new Date(challenge.startDate).toLocaleDateString()}</div>
                        <div>Fin: {new Date(challenge.endDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/edit-challenge/${challenge.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <FaEdit className="inline mr-1" /> Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(challenge.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="inline mr-1" /> Supprimer
                        </button>
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

export default SuperAdminChallenges;