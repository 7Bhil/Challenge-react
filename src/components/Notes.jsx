import React, { useState, useEffect } from 'react';
import { FaStar, FaLink, FaUser, FaSearch, FaCheck, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { submissionService, challengeService } from '../service/api';

const JurySubmissions = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Rating state
  const [scores, setScores] = useState({
    codeQuality: 0,
    functionality: 0,
    creativity: 0,
    performance: 0,
    documentation: 0
  });
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [challengeId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch challenge details
      if (challengeId) {
        const cResp = await challengeService.getById(challengeId);
        if (cResp.success) setChallenge(cResp.data);
      }

      await fetchSubmissions();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const filters = { status: 'pending,under_review' };
      if (challengeId) filters.challengeId = challengeId;
      
      const response = await submissionService.getAll(filters);
      if (response.success) {
        // Obtenir l'utilisateur actuel (Jury)
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        let data = response.data;
        
        // Filter by challengeId if not handled by backend (safeguard)
        if (challengeId) {
          data = data.filter(sub => sub.challenge?._id === challengeId || sub.challenge === challengeId);
        }

        // Filtrer les soumissions déjà notées par ce jury
        const pendingForMe = data.filter(sub => {
          if (!sub.scores || sub.scores.length === 0) return true;
          const hasVoted = sub.scores.some(score => 
            (score.jury?._id ? score.jury._id.toString() : score.jury.toString()) === (currentUser.id || currentUser._id).toString()
          );
          return !hasVoted;
        });

        setSubmissions(pendingForMe);
        setFilteredSubmissions(pendingForMe);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(submission => 
        submission.challenge?.title.toLowerCase().includes(term.toLowerCase()) ||
        submission.user?.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  };

  const handleEvaluate = (submission) => {
    setSelectedSubmission(submission);
    // Reset scores or load existing if user already graded (need backend support for 'my score' view, simpler to just reset for now)
    setScores({
        codeQuality: 0,
        functionality: 0,
        creativity: 0,
        performance: 0,
        documentation: 0
    });
    setComment('');
  };

  const handleScoreChange = (criteria, value) => {
    setScores(prev => ({
        ...prev,
        [criteria]: parseInt(value)
    }));
  };

  const calculateTotal = () => {
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return sum; // Max 100
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedSubmission) return;

    try {
        const payload = {
            ...scores,
            comment
        };
        
        await submissionService.score(selectedSubmission._id, payload);
        
        alert('Évaluation enregistrée avec succès!');
        
        // Retirer la soumission de la liste locale
        const updatedList = submissions.filter(s => s._id !== selectedSubmission._id);
        setSubmissions(updatedList);
        setFilteredSubmissions(updatedList);
        
        setSelectedSubmission(null);
    } catch (error) {
        console.error("Error submitting score:", error);
        alert('Erreur lors de l\'enregistrement de la note');
    }
  };

  const renderStars = (criteria) => {
    const currentScore = scores[criteria];
    // Max 20 per criteria. 5 stars = 4 points each? Or 5 stars = 20 points? 
    // Let's use a slider for precision as in the original code, but per criteria.
    // Or just 5 stars where 1 star = 4 points.
    return (
      <div className="flex items-center space-x-2">
         <input
            type="range"
            min="0"
            max="20"
            value={currentScore}
            onChange={(e) => handleScoreChange(criteria, e.target.value)}
            className="w-32"
        />
        <span className="text-sm font-medium w-8">{currentScore}/20</span>
      </div>
    );
  };

  if (loading) {
      return <div className="p-8 text-center text-gray-500">Chargement des soumissions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 text-white border-b border-gray-700">
            <div className="flex items-center gap-4 mb-2">
              <button 
                onClick={() => navigate('/jury/dashboard')}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-2xl font-bold">
                {challenge ? `Soumissions : ${challenge.title}` : 'Évaluations des Soumissions'}
              </h1>
            </div>
            <p className="mt-2 text-gray-300 ml-10">
              {challenge ? `Niveau: ${challenge.difficulty} • Technos: ${challenge.technologies?.join(', ')}` : 'Évaluez les travaux soumis par les participants'}
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="p-6 border-b border-gray-700 bg-gray-800">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg leading-5 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Rechercher par challenge ou participant..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Liste des soumissions */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Challenge
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Participant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Liens
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredSubmissions.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-8 text-gray-500">Aucune soumission trouvée</td></tr>
                ) : (
                filteredSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{submission.challenge?.title || 'Challenge supprimé'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">{submission.user?.name || 'Utilisateur inconnu'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                            {submission.githubUrl && (
                                <a
                                    href={submission.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 flex items-center text-xs transition-colors"
                                >
                                    <FaLink className="mr-1" /> GitHub
                                </a>
                            )}
                             {submission.liveUrl && (
                                <a
                                    href={submission.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 flex items-center text-xs transition-colors"
                                >
                                    <FaLink className="mr-1" /> Live
                                </a>
                            )}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border 
                        ${submission.status === 'approved' ? 'bg-green-900/30 text-green-400 border-green-500/30' : 
                          submission.status === 'rejected' ? 'bg-red-900/30 text-red-400 border-red-500/30' :
                          submission.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' :
                          'bg-blue-900/30 text-blue-400 border-blue-500/30' // under_review
                        }`}>
                          {submission.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEvaluate(submission)}
                        className="text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-md transition-all"
                      >
                        Noter
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

      {/* Modal d'évaluation */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 m-4 border border-gray-700">
             <button 
                onClick={() => setSelectedSubmission(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
                <FaTimes size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-4">
              Évaluation: {selectedSubmission.user?.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                     <p className="text-sm text-gray-400 mb-1">Challenge</p>
                     <p className="font-semibold text-white">{selectedSubmission.challenge?.title}</p>
                     
                     <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-1">Description</p>
                        <p className="text-sm text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700">{selectedSubmission.description}</p>
                     </div>
                </div>
                
                 <div>
                    <h4 className="font-medium text-blue-400 mb-4">Critères de notation (0-20)</h4>
                    
                    <div className="space-y-4">
                        {[
                          { label: 'Qualité du Code', key: 'codeQuality' },
                          { label: 'Fonctionnalité', key: 'functionality' },
                          { label: 'Créativité', key: 'creativity' },
                          { label: 'Performance', key: 'performance' },
                          { label: 'Documentation', key: 'documentation' }
                        ].map((item) => (
                           <div key={item.key} className="flex justify-between items-center">
                              <label className="text-sm text-gray-300">{item.label}</label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="range"
                                  min="0"
                                  max="20"
                                  value={scores[item.key]}
                                  onChange={(e) => handleScoreChange(item.key, e.target.value)}
                                  className="w-24 accent-blue-500"
                                />
                                <span className="text-sm font-medium w-10 text-right text-blue-400">{scores[item.key]}/20</span>
                              </div>
                           </div>
                        ))}
                        
                        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between font-bold">
                            <span className="text-white">Note Finale Provisoire:</span>
                            <span className="text-blue-400 text-lg">{calculateTotal()}/100</span>
                        </div>
                    </div>
                 </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Commentaire général
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre feedback constructif..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitEvaluation}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center"
              >
                <FaCheck className="mr-2" /> Valider la note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JurySubmissions;