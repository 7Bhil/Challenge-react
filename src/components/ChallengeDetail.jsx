import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../service/api'; // Import ton instance axios

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState({
    repositoryUrl: '',
    comment: '',
    liveDemoUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, [id]);
const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/challenges/${id}`);
      
      if (response.data.success) {
        setChallenge(response.data.data);
      } else {
        navigate('/challenges', { replace: true });
      }
    } catch (error) {
      console.error('Erreur chargement challenge:', error);
      navigate('/challenges', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un appel API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Soumission:', submission);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
   if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }
  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'facile': return 'text-green-600 bg-green-100';
      case 'moyenne': return 'text-yellow-600 bg-yellow-100';
      case 'difficile': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'en cours': return 'text-pink-800 bg-pink-100';
      case 'à venir': return 'text-blue-800 bg-blue-100';
      case 'terminé': return 'text-green-800 bg-green-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  // Vérification des propriétés optionnelles
  const technologies = challenge.technologies || [];
  const participants = challenge.participants || [];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-purple-600 hover:text-purple-800">
              Accueil
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <Link to="/challenges" className="ml-1 text-purple-600 hover:text-purple-800 md:ml-2">
                Défis
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-gray-400 md:ml-2">{challenge.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Détails du défi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-purple-800">{challenge.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(challenge.status)}`}>
                {challenge.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{challenge.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="block text-sm font-medium text-gray-500">Date de début:</span>
                <p className="text-lg font-semibold">
                  {challenge.start_date ? new Date(challenge.start_date).toLocaleDateString() : 'Non spécifiée'}
                </p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Date de fin:</span>
                <p className="text-lg font-semibold">
                  {challenge.end_date ? new Date(challenge.end_date).toLocaleDateString() : 'Non spécifiée'}
                </p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Difficulté:</span>
                <p className={`text-lg font-semibold px-3 py-1 rounded-full inline-block ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty || 'Non spécifiée'}
                </p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Participants:</span>
                <p className="text-lg font-semibold">{participants.length}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="block text-sm font-medium text-gray-500 mb-2">Technologies requises:</span>
              <div className="flex flex-wrap gap-2">
                {technologies.length > 0 ? (
                  technologies.map((tech, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Aucune technologie spécifiée</span>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Critères d'évaluation</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Qualité du code et respect des bonnes pratiques</li>
                <li>Fonctionnalités implémentées</li>
                <li>Design et expérience utilisateur</li>
                <li>Originalité et créativité</li>
                <li>Performance et optimisation</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Formulaire de soumission */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-purple-800 mb-6">Soumettre votre solution</h2>
            
            {submissionSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-green-800 font-medium">Votre solution a été soumise avec succès!</span>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  Elle sera examinée par notre équipe. Vous serez notifié dès qu'une évaluation est disponible.
                </p>
                <button
                  onClick={() => setSubmissionSuccess(false)}
                  className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Soumettre une autre solution
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                
                
                <div className="mb-4">
                  <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    URL de la démo live 
                  </label>
                  <input
                    type="url"
                    id="liveDemoUrl"
                    name="liveDemoUrl"
                    value={submission.liveDemoUrl}
                    onChange={handleInputChange}
                    placeholder="https://votre-projet.vercel.app"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    URL du dépôt Git *(optionnel)
                  </label>
                  <input
                    type="url"
                    id="repositoryUrl"
                    name="repositoryUrl"
                    value={submission.repositoryUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/votre-username/nom-du-projet"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Commentaires (optionnel)
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={submission.comment}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Décrivez votre approche, les difficultés rencontrées, les fonctionnalités implémentées..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                    isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                  } transition duration-300`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Soumission en cours...
                    </div>
                  ) : (
                    'Soumettre ma solution'
                  )}
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  * Assurez-vous que votre dépôt git est public et contient un README expliquant comment exécuter votre projet.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;