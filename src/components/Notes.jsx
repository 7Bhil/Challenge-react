import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  ChevronRight, 
  CheckCircle, 
  Lock as LockIcon, 
  Search,
  Zap,
  Star,
  ArrowLeft,
  Link as LinkIcon,
  User,
  X,
  Check,
  Calendar
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
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
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        let data = response.data;
        
        if (challengeId) {
          data = data.filter(sub => sub.challenge?._id === challengeId || sub.challenge === challengeId);
        }

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
    return sum;
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
        
        const updatedList = submissions.filter(s => s._id !== selectedSubmission._id);
        setSubmissions(updatedList);
        setFilteredSubmissions(updatedList);
        
        setSelectedSubmission(null);
    } catch (error) {
        console.error("Error submitting score:", error);
        alert('Erreur lors de l\'enregistrement de la note');
    }
  };

  if (loading) {
      return (
        <div className="min-h-screen bg-gray-950 pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/jury/dashboard')}
              className="p-3 bg-gray-900/40 border border-gray-800 rounded-2xl hover:bg-gray-800 hover:border-gray-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                Soumissions - <span className="text-yellow-400">{challenge?.title || 'Challenge'}</span>
              </h1>
              {challenge && (
                <div className="flex flex-wrap gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                    challenge.difficulty === 'hard' || challenge.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400' :
                    challenge.difficulty === 'medium' || challenge.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 bg-gray-800/50 border border-gray-700/50">
                    {challenge.technologies?.join(' • ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par participant..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-12 pr-6 py-3 bg-gray-900 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 w-full"
            />
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/60">
                <tr>
                  <th className="px-8 py-5 text-left">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Participant</span>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Challenge</span>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Liens</span>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Date</span>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Statut</span>
                  </th>
                  <th className="px-8 py-5 text-right">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-16 text-center">
                      <Trophy className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-500 mb-2">Aucune soumission à évaluer</h3>
                      <p className="text-gray-600">Toutes les soumissions ont été notées ou sont en attente.</p>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-900/80 transition-all">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800/50 rounded-xl border border-gray-700/50">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {submission.user?.name || 'Utilisateur inconnu'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {submission.user?.email || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-white font-medium">
                          {submission.challenge?.title || 'Challenge supprimé'}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-3">
                          {submission.challenge?.submissionType === 'full' && (
                            <>
                              {submission.githubUrl && (
                                <a
                                  href={submission.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all group"
                                  title="GitHub"
                                >
                                  <LinkIcon className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />
                                </a>
                              )}
                              {submission.liveUrl && (
                                <a
                                  href={submission.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all group"
                                  title="Live Demo"
                                >
                                  <Zap className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                                </a>
                              )}
                            </>
                          )}
                          {submission.challenge?.submissionType === 'file' && submission.fileUrl && (
                            <a
                              href={submission.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all group"
                              title="Fichier"
                            >
                              <LinkIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                            </a>
                          )}
                          {submission.challenge?.submissionType === 'password' && (
                             <div className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg" title="Password">
                                <LockIcon className="w-4 h-4 text-yellow-500" />
                             </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(submission.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          submission.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                          submission.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                          submission.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleEvaluate(submission)}
                          className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-black rounded-2xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30"
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

      {/* Evaluation Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Évaluation de <span className="text-yellow-400">{selectedSubmission.user?.name}</span>
                  </h2>
                  <p className="text-gray-400">Challenge: {selectedSubmission.challenge?.title}</p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 hover:bg-gray-800 rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Submission Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-yellow-400" />
                      Informations du participant
                    </h3>
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Nom:</span>
                          <span className="text-white font-medium">{selectedSubmission.user?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email:</span>
                          <span className="text-white">{selectedSubmission.user?.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date de soumission:</span>
                          <span className="text-white">
                            {new Date(selectedSubmission.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-yellow-400" />
                      Données de soumission
                    </h3>
                    <div className="space-y-3">
                      {selectedSubmission.challenge?.submissionType === 'full' && (
                        <>
                          {selectedSubmission.githubUrl && (
                            <a
                              href={selectedSubmission.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-gray-900/60 border border-gray-800 rounded-2xl hover:bg-gray-800 hover:border-gray-700 transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-xl">
                                  <LinkIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </div>
                                <span className="text-white font-medium">Repository GitHub</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400" />
                            </a>
                          )}
                          {selectedSubmission.liveUrl && (
                            <a
                              href={selectedSubmission.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-gray-900/60 border border-gray-800 rounded-2xl hover:bg-gray-800 hover:border-gray-700 transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-xl">
                                  <Zap className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </div>
                                <span className="text-white font-medium">Démo Live</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400" />
                            </a>
                          )}
                        </>
                      )}

                      {selectedSubmission.challenge?.submissionType === 'file' && selectedSubmission.fileUrl && (
                        <a
                          href={selectedSubmission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-gray-900/60 border border-gray-800 rounded-2xl hover:bg-gray-800 hover:border-gray-700 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-800 rounded-xl">
                              <LinkIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-white font-medium">Lien du fichier</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                        </a>
                      )}

                      {selectedSubmission.challenge?.submissionType === 'password' && (
                        <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-2xl">
                          <div className="text-gray-400 text-xs mb-2 uppercase font-black">Clé soumise :</div>
                          <div className="text-yellow-400 font-mono text-lg break-all">
                            {selectedSubmission.submittedPassword}
                          </div>
                          {selectedSubmission.challenge?.correctPassword && (
                            <div className="mt-3 pt-3 border-t border-gray-800">
                               <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Clé attendue :</div>
                               <div className="text-gray-400 font-mono text-sm">
                                  {selectedSubmission.challenge.correctPassword}
                               </div>
                               <div className="mt-2 text-xs">
                                  {selectedSubmission.submittedPassword === selectedSubmission.challenge.correctPassword ? (
                                    <span className="text-green-500 flex items-center gap-1 font-bold underline">
                                       <Check className="w-3 h-3" /> MATCH PARFAIT
                                    </span>
                                  ) : (
                                    <span className="text-red-500 font-bold underline">
                                       NE CORRESPOND PAS
                                    </span>
                                  )}
                               </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4">
                      <p className="text-gray-300 leading-relaxed">
                        {selectedSubmission.description || 'Aucune description fournie.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Evaluation Form */}
                <div>
                  <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 border border-yellow-500/20 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">Critères d'évaluation</h3>
                    <p className="text-gray-400 text-sm mb-4">Notez chaque critère sur 20 points</p>
                    
                    <div className="space-y-6">
                      {[
                        { label: 'Qualité du Code', key: 'codeQuality' },
                        { label: 'Fonctionnalité', key: 'functionality' },
                        { label: 'Créativité', key: 'creativity' },
                        { label: 'Performance', key: 'performance' },
                        { label: 'Documentation', key: 'documentation' }
                      ].map((item) => (
                        <div key={item.key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{item.label}</span>
                            <span className="text-yellow-400 font-bold text-lg">{scores[item.key]}/20</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={scores[item.key]}
                            onChange={(e) => handleScoreChange(item.key, e.target.value)}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-yellow-400"
                          />
                          <div className="flex justify-between text-xs text-gray-500 px-1">
                            <span>0 - Insuffisant</span>
                            <span>10 - Acceptable</span>
                            <span>20 - Excellent</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Commentaire</h3>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-transparent"
                      placeholder="Donnez votre feedback constructif au participant..."
                    />
                  </div>

                  {/* Total Score */}
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-400 text-sm">Note totale</div>
                        <div className="text-3xl font-bold text-white">{calculateTotal()}/100</div>
                      </div>
                      <div className={`px-4 py-2 rounded-xl font-bold ${
                        calculateTotal() >= 80 ? 'bg-green-500/20 text-green-400' :
                        calculateTotal() >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {calculateTotal() >= 80 ? 'Excellent' :
                         calculateTotal() >= 60 ? 'Bon' :
                         'À améliorer'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-medium rounded-2xl hover:bg-gray-800 transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSubmitEvaluation}
                      className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-black rounded-2xl transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Valider l'évaluation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JurySubmissions;