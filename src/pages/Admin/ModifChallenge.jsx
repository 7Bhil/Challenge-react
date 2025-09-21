import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeForm from '../../components/ChallengeForm'; // Nous allons créer ce composant

const EditChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // Récupérer le challenge depuis le localStorage
    const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const challengeToEdit = storedChallenges.find(c => c.id === parseInt(id));
    if (challengeToEdit) {
      setChallenge(challengeToEdit);
    }
  }, [id]);

  if (!challenge) {
    return <div>Challenge non trouvé</div>;
  }

  return (
    <div>
      <h1>Modifier le Challenge</h1>
      <ChallengeForm isEdit={true} challengeData={challenge} />
    </div>
  );
};

export default EditChallenge;