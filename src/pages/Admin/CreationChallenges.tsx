import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaCode, FaSignInAlt } from 'react-icons/fa';

const CreateChallenge = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    difficulty: 'medium',
    technologies: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour le moment, on affiche juste les données dans la console
    console.log('Données du challenge:', formData);
    alert('Challenge créé avec succès! (Vérifiez la console pour voir les données)');
    
    // Réinitialiser le formulaire après soumission
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      difficulty: 'medium',
      technologies: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
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
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre du Challenge *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Application de Gestion de Tâches"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez en détail le challenge, les objectifs à atteindre, les contraintes éventuelles..."
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Date de Début *
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Date de Fin *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Difficulté */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau de Difficulté *
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Facile</option>
                <option value="medium">Moyen</option>
                <option value="hard">Difficile</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaCode className="mr-1" /> Technologies (optionnel)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: React, Node.js, MongoDB (séparées par des virgules)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Séparez les technologies par des virgules
              </p>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setFormData({
                  title: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                  difficulty: 'medium',
                  technologies: ''
                })}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <FaPlus className="mr-2" /> Créer le Challenge
              </button>
            </div>
          </form>

          {/* Note sur l'accès public */}
          <div className="bg-yellow-50 border-t border-yellow-200 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaSignInAlt className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Accès public
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
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