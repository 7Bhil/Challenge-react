import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChallengeForm from '../../components/ChallengeForm';
import { challengeService } from '../../service/api';

const EditChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await challengeService.getById(id);
        if (response.success) {
          setChallenge(response.data);
        } else {
          setError('Challenge non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du challenge');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const response = await challengeService.update(id, formData);
      if (response.success) {
        navigate(`/challenge/${id}`);
      }
    } catch (err) {
      console.error('Erreur mise à jour:', err);
      alert('Erreur lors de la mise à jour du challenge');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        {error || 'Challenge non trouvé'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Modifier le Challenge</h1>
        <ChallengeForm 
          isEdit={true} 
          initialData={challenge} 
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditChallenge;