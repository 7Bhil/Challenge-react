const ChallengeCard = ({ challenge }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'en cours': return 'bg-pink-100 text-pink-800';
      case 'à venir': return 'bg-blue-100 text-blue-800';
      case 'terminé': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'facile': return 'text-green-600';
      case 'moyenne': return 'text-yellow-600';
      case 'difficile': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-purple-800">{challenge.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
            {challenge.status}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm font-medium text-purple-700">Début:</span>
            <p>{challenge.start_date}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-purple-700">Fin:</span>
            <p>{challenge.end_date}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-purple-700">Difficulté:</span>
            <p className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-purple-700">Participants:</span>
            <p>{challenge.participants.length}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          
        </div>
        
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
          Voir le défi
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;