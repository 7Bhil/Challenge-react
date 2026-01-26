import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCode, FaSave, FaTimes } from 'react-icons/fa';

const ChallengeForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    difficulty: 'medium',
    technologies: '',
    xpReward: 200,
    financialReward: 0
  });

  const [errors, setErrors] = useState({});

  // Initialiser le formulaire avec les données existantes en mode édition
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        difficulty: initialData.difficulty || 'medium',
        technologies: initialData.technologies || '',
        xpReward: initialData.xpReward || 200,
        financialReward: initialData.financialReward || 0
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Validation stricte pour l'XP
    if (name === 'xpReward') {
      const numValue = parseInt(value) || 0;
      if (numValue > 1000) {
        value = 1000;
      } else if (numValue < 0) {
        value = 0;
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur du champ lorsqu'il est modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'La date de fin est requise';
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end <= start) {
        newErrors.endDate = 'La date de fin doit être après la date de début';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Fonction pour formater la date pour l'input datetime-local
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* En-tête */}
      <div className={`p-6 text-white ${isEdit ? 'bg-yellow-600' : 'bg-blue-600'}`}>
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Modifier le Challenge' : 'Créer un Nouveau Challenge'}
        </h1>
        <p className="mt-2">
          {isEdit 
            ? 'Modifiez les détails du challenge ci-dessous.' 
            : 'Remplissez le formulaire ci-dessous pour créer un nouveau challenge.'}
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
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: Application de Gestion de Tâches"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
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
            rows={4}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Décrivez en détail le challenge, les objectifs à atteindre, les contraintes éventuelles..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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
              value={formatDateForInput(formData.startDate)}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>
          <div>
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCalendarAlt className="mr-1" /> Date de Fin *
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formatDateForInput(formData.endDate)}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
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

        {/* Récompenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
           <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                 Récompenses
              </h3>
           </div>
           
           <div>
              <label htmlFor="xpReward" className="block text-sm font-medium text-gray-700 mb-1">
                 Points d'XP (Max 1000)
              </label>
              <input
                type="number"
                id="xpReward"
                name="xpReward"
                min="0"
                max="1000"
                value={formData.xpReward}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
           </div>

           <div>
              <label htmlFor="financialReward" className="block text-sm font-medium text-gray-700 mb-1">
                 Récompense (FCFA)
              </label>
              <input
                type="number"
                id="financialReward"
                name="financialReward"
                min="0"
                step="500"
                value={formData.financialReward}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
           </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <FaTimes className="mr-2" /> Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            <FaSave className="mr-2" /> {isEdit ? 'Modifier' : 'Créer'} le Challenge
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;