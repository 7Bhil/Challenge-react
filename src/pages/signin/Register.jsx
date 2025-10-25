import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passion: 'DEV_FRONT'
  });
const API_URL = import.meta.env.VITE_API_BASE_URL;
const navigate = useNavigate();
  const handleRegister = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Ajouter le rôle CHALLENGER par défaut
      const dataToSend = {
        ...registerData,
        name: registerData.name,
        role: 'Challenger'
      };

      const response = await axios.post(`${API_URL}/users/register`, dataToSend);



      setMessage({ 
        type: 'success', 
         text: response.data.message || 'Inscription réussie !'
      });
      // 3. Redirection : Après 2 secondes, naviguer vers la page de connexion
            setTimeout(() => {
                navigate('/login'); // <-- L'action de redirection
            }, 2000); // Délai optionnel pour laisser le message s'afficher
      
    }catch (error) {
        let errorMessage = "Erreur inconnue.";
        
        if (error.response) {
            // CASE 1: Server replied with 4xx or 5xx. This is a VALIDATION failure.
            errorMessage = error.response.data.message || `Erreur du serveur (Statut ${error.response.status})`;
        } else if (error.request) {
            // CASE 2: Request sent, but NO response received (Server is OFFLINE or URL is wrong).
            errorMessage = "Erreur de connexion : Le serveur est-il démarré sur le bon port (5000) ?";
        } else {
            // CASE 3: Client-side error.
            errorMessage = error.message;
        }

        setMessage({ type: 'error', text: errorMessage });
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-violet-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Inscription</h1>
            <p className="text-gray-600 mt-2">Rejoignez le hackathon</p>
          </div>

          {/* Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Formulaire */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SPECIALITE
                </label>
                <select
                  value={registerData.passion}
                  onChange={(e) => setRegisterData({...registerData, passion: e.target.value})}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                >
                  <option value="DEV_FRONT">Frontend</option>
                  <option value="DEV_BACK">Backend</option>
                  <option value="DEV_FULLSTACK">Fullstack</option>
                  <option value="DEV_MOBILE">Mobile</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-700 text-sm">
                <strong>Info :</strong> Vous serez inscrit comme "Challenger". Les promotions sont gérées par l'administration.
              </p>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading || !registerData.name || !registerData.email || !registerData.password}
              className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg hover:bg-violet-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </div>

          {/* Lien vers connexion */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <Link
                className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
                to="/login"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};