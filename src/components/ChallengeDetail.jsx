import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { submissionService } from '../service/api';

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
    
    try {
      const payload = {
        challengeId: id,
        githubUrl: submission.repositoryUrl,
        liveUrl: submission.liveDemoUrl,
        description: submission.comment,
        technologies: '' // Optionnel si on veut l'ajouter plus tard
      };
      
      const response = await submissionService.create(payload);
      
      if (response.success) {
        setSubmissionSuccess(true);
        // Optionnel: Mettre à jour la liste des participants si on veut un feedback immédiat
        // fetchChallenge(); 
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue lors de la soumission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !challenge) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'facile': return 'text-green-400 bg-green-900/30';
      case 'moyenne': return 'text-yellow-400 bg-yellow-900/30';
      case 'difficile': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'en cours': return 'text-pink-400 bg-pink-900/30';
      case 'à venir': return 'text-blue-400 bg-blue-900/30';
      case 'terminé': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const technologies = challenge.technologies || [];
  const participants = challenge.participants || [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 mt-14">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/challenges" className="ml-1 text-purple-400 hover:text-purple-300 md:ml-2 transition-colors">
                  Défis
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-purple-300">{challenge.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(challenge.status)}`}>
                  {challenge.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">{challenge.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="block text-sm font-medium text-gray-400">Date de début:</span>
                  <p className="text-lg font-semibold text-gray-100">
                    {challenge.start_date ? new Date(challenge.start_date).toLocaleDateString() : 'Non spécifiée'}
                  </p>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-400">Date de fin:</span>
                  <p className="text-lg font-semibold text-gray-100">
                    {challenge.end_date ? new Date(challenge.end_date).toLocaleDateString() : 'Non spécifiée'}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="text-center">
                   <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">XP Gain</span>
                   <p className="text-xl font-bold text-yellow-400">
                      +{challenge.xpPoints || 0}
                   </p>
                </div>
                <div className="text-center border-l border-gray-700">
                   <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cash Prize</span>
                   <p className="text-xl font-bold text-green-400">
                      {challenge.financialReward ? `${challenge.financialReward.toLocaleString()} FCFA` : '-'}
                   </p>
                </div>
                <div className="text-center border-l border-gray-700">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Participants</span>
                  <p className="text-xl font-bold text-blue-400">{challenge.participantCount || 0}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="block text-sm font-medium text-gray-400 mb-2">Difficulté:</span>
                <p className={`text-lg font-semibold px-4 py-2 rounded-lg inline-block ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty || 'Non spécifiée'}
                </p>
              </div>
              
              <div className="mb-6">
                <span className="block text-sm font-medium text-gray-400 mb-2">Technologies requises:</span>
                <div className="flex flex-wrap gap-2">
                  {technologies.length > 0 ? (
                    technologies.map((tech, index) => (
                      <span key={index} className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-800">
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Aucune technologie spécifiée</span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Critères d'évaluation</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
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
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">Soumettre votre solution</h2>
              
              {submissionSuccess ? (
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-green-400 font-medium">Votre solution a été soumise avec succès!</span>
                  </div>
                  <p className="text-green-300/80 text-sm mt-2">
                    Elle sera examinée par notre équipe. Vous serez notifié dès qu'une évaluation est disponible.
                  </p>
                  <button
                    onClick={() => setSubmissionSuccess(false)}
                    className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    Soumettre une autre solution
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-300 mb-1">
                      URL du dépôt Git <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="url"
                      id="repositoryUrl"
                      name="repositoryUrl"
                      value={submission.repositoryUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/votre-username/nom-du-projet"
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-gray-300 mb-1">
                      URL de la démo live (optionnel)
                    </label>
                    <input
                      type="url"
                      id="liveDemoUrl"
                      name="liveDemoUrl"
                      value={submission.liveDemoUrl}
                      onChange={handleInputChange}
                      placeholder="https://votre-projet.vercel.app"
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
                      Commentaires (optionnel)
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={submission.comment}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Décrivez votre approche, les difficultés rencontrées, les fonctionnalités implémentées..."
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                      isSubmitting ? 'bg-purple-600/50 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20'
                    } transition-all duration-300 transform hover:scale-[1.02]`}
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
                  
                  <p className="text-xs text-gray-400 mt-4">
                    * Assurez-vous que votre dépôt git est public et contient un README expliquant comment exécuter votre projet.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;