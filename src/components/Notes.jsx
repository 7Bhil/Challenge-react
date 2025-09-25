import React, { useState, useEffect } from 'react';
import { FaStar, FaLink, FaUser, FaSearch, FaCheck } from 'react-icons/fa';

const JurySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Données simulées
    const mockSubmissions = [
      {
        id: 1,
        challengeId: 101,
        challengeTitle: 'Application de Gestion de Tâches',
        participantName: 'Jean Dupont',
        submissionLink: 'https://github.com/jeandupont/todo-app',
        submittedAt: '2023-10-15T14:30:00',
        status: 'pending'
      },
      {
        id: 2,
        challengeId: 102,
        challengeTitle: 'API REST avec Node.js',
        participantName: 'Marie Martin',
        submissionLink: 'https://github.com/mariemartin/api-rest',
        submittedAt: '2023-10-16T10:15:00',
        status: 'evaluated',
        score: 85,
        comment: 'Très bon travail, mais manque de documentation.'
      },
      {
        id: 3,
        challengeId: 101,
        challengeTitle: 'Application de Gestion de Tâches',
        participantName: 'Pierre Lambert',
        submissionLink: 'https://github.com/pierrelambert/task-manager',
        submittedAt: '2023-10-17T16:45:00',
        status: 'pending'
      }
    ];

    setSubmissions(mockSubmissions);
    setFilteredSubmissions(mockSubmissions);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(submission => 
        submission.challengeTitle.toLowerCase().includes(term.toLowerCase()) ||
        submission.participantName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  };

  const handleEvaluate = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score || 0);
    setComment(submission.comment || '');
  };

  const handleSubmitEvaluation = () => {
    if (!selectedSubmission) return;

    const updatedSubmissions = submissions.map(sub => 
      sub.id === selectedSubmission.id 
        ? { ...sub, status: 'evaluated', score, comment }
        : sub
    );

    setSubmissions(updatedSubmissions);
    setFilteredSubmissions(updatedSubmissions);
    setSelectedSubmission(null);
    alert('Évaluation enregistrée avec succès!');
  };

  const renderStars = (currentScore) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar 
            key={star}
            className={`h-5 w-5 cursor-pointer ${
              star <= currentScore / 20 ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setScore(star * 20)}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{currentScore}/100</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Évaluations des Soumissions</h1>
            <p className="mt-2">Évaluez les travaux soumis par les participants</p>
          </div>

          {/* Barre de recherche */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rechercher par challenge ou participant..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Liste des soumissions */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Challenge
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lien de soumission
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.challengeTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{submission.participantName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={submission.submissionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaLink className="mr-1" /> Voir la soumission
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.status === 'evaluated' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Évalué
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          En attente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEvaluate(submission)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {submission.status === 'evaluated' ? 'Modifier' : 'Évaluer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'évaluation */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Évaluation de {selectedSubmission.participantName}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Challenge: {selectedSubmission.challengeTitle}
            </p>
            <a
              href={selectedSubmission.submissionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
            >
              <FaLink className="inline mr-1" /> Voir la soumission
            </a>

            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (0-100)
              </label>
              {renderStars(score)}
              <input
                type="range"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Votre commentaire sur la soumission..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitEvaluation}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
              >
                <FaCheck className="mr-2" /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JurySubmissions;