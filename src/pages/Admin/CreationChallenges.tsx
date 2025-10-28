import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaCode, FaSignInAlt } from 'react-icons/fa';
import api from '../../service/api';
import { Navigate } from 'react-router-dom';

const CreateChallenge = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    difficulty: 'Moyen',
    technologies: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem('token');
    console.log('Token disponible:', !!token);
    console.log('Token from localStorage:', token);
  console.log('API defaults:', api.defaults.headers.common);
    const response = await api.post('/challenges', formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 10000 // Augmente le timeout à 10 secondes
    });
    if (response.data.success) {
      alert('Challenge créé avec succès!');
      navigate('/Challenges');
    }
    
    // ... reste du code
  } catch (error) {
    console.error('Erreur détaillée:', error);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-10 mt-10 sm:px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-700">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center">
              <FaPlus className="mr-2" /> Créer un Nouveau Challenge
            </h1>
            <p className="mt-2 opacity-90">
              Remplissez le formulaire ci-dessous pour créer un nouveau challenge pour la communauté.
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Titre */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Titre du Challenge *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Ex: Application de Gestion de Tâches"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Décrivez en détail le challenge, les objectifs à atteindre, les contraintes éventuelles..."
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Date de Début *
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Date de Fin *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Difficulté */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
                Niveau de Difficulté *
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                <FaCode className="mr-1" /> Technologies (optionnel)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Ex: React, Node.js, MongoDB (séparées par des virgules)"
              />
              <p className="text-xs text-gray-400 mt-1">
                Séparez les technologies par des virgules
              </p>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setFormData({
                  title: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                  difficulty: 'Moyen',
                  technologies: ''
                })}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                <FaPlus className="mr-2" /> {loading ? 'Création...' : 'Créer le Challenge'}
              </button>
            </div>
          </form>

          {/* Note sur l'accès public */}
          <div className="bg-red-950/30 border-t border-red-900/50 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaSignInAlt className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-300">
                  Accès public
                </h3>
                <div className="mt-2 text-sm text-red-400/80">
                  <p>
                    Cette page est actuellement accessible sans authentification pour les tests.
                    Dans une version finale, l'accès serait restreint aux administrateurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;