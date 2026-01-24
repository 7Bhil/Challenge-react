import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaUser,
  FaCrown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { challengeService, adminService } from "../../service/api";

const SuperAdminChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(term.toLowerCase()) ||
          challenge.description.toLowerCase().includes(term.toLowerCase()) ||
          (challenge.technologies && challenge.technologies.join(", ").toLowerCase().includes(term.toLowerCase())) ||
          (challenge.createdBy?.name && challenge.createdBy.name.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredChallenges(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce challenge ? Cela supprimera également toutes les soumissions associées.")) {
      try {
        const response = await adminService.deleteChallenge(id);
        if (response.success) {
          alert("Challenge supprimé avec succès");
          fetchChallenges();
        }
      } catch (err) {
        console.error("Erreur suppression:", err);
        alert(err.response?.data?.message || "Erreur lors de la suppression");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Actif
          </span>
        );
      case "upcoming":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            À venir
          </span>
        );
      case "completed":
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Terminé
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Inconnu
          </span>
        );
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Facile
          </span>
        );
      case "medium":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Moyen
          </span>
        );
      case "hard":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Difficile
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Inconnu
          </span>
        );
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
    <div className="min-h-screen bg-gray-950 text-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-purple-900/40 via-purple-600/40 to-blue-600/40 p-8 border-b border-gray-800 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold flex items-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  <FaCrown className="mr-3 text-yellow-500" /> Gestion des Challenges
                </h1>
                <p className="mt-2 text-gray-400 font-medium">
                  Console d'administration Super Admin • Contrôle total
                </p>
              </div>
              <Link
                to="/creation-challenge"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:scale-105"
              >
                <FaPlus className="mr-2" /> Créer un Challenge
              </Link>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="p-6 bg-gray-900/50 border-b border-gray-800">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl leading-5 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                placeholder="Rechercher par titre, techno ou créateur..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Liste des challenges */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-950/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Challenge
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Auteur
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Infos
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Période
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-900/30">
                {filteredChallenges.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <FaSearch className="text-gray-700 text-4xl mb-4" />
                        <p className="text-gray-500 text-lg italic">Aucun challenge ne correspond à votre recherche</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredChallenges.map((challenge) => (
                    <tr key={challenge._id} className="hover:bg-gray-800/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                          {challenge.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-xs mt-1">
                          {challenge.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 border border-gray-700">
                             <FaUser className="text-gray-500 text-xs" />
                          </div>
                          <span className="text-sm font-medium text-gray-300 italic">
                            {challenge.createdBy?.name || "Inconnu"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="mb-1">{getDifficultyBadge(challenge.difficulty)}</div>
                        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                          {challenge.technologies?.join(", ") || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(challenge.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                        <div className="flex flex-col gap-1">
                          <span className="text-green-500/70">Du {new Date(challenge.startDate).toLocaleDateString()}</span>
                          <span className="text-red-500/70">Au {new Date(challenge.endDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/edit-challenge/${challenge._id}`}
                            className="p-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                            title="Modifier"
                          >
                            <FaEdit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(challenge._id)}
                            className="p-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                            title="Supprimer"
                          >
                            <FaTrash size={16} />
                          </button>
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

export default SuperAdminChallenges;
