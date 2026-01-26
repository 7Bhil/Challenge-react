import React, { useState } from 'react';
import { User, Mail, Lock as LockIcon, Eye, EyeOff, UserPlus, ArrowLeft, Brain, Rocket, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../service/api';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passion: 'DEV_FULLSTACK'
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Les données sont envoyées à /auth/register ou /users/register selon votre API
      // D'après userRoutes.js, c'est /users/register
      const dataToSend = {
        ...registerData,
        role: 'Challenger'
      };

      const response = await api.post(`/users/register`, dataToSend);

      setMessage({ 
        type: 'success', 
        text: '✓ Inscription réussie ! Redirection...'
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      let errorMessage = "Erreur lors de l'inscription";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = "Impossible de contacter le serveur. Vérifiez votre connexion.";
      }
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm">Retour à l'accueil</span>
        </button>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center border border-gray-800 shadow-lg">
                <UserPlus className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Inscription</h1>
            <p className="text-gray-400 text-sm">Prêt à relever de nouveaux défis ?</p>
          </div>

          {/* Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 ${
              message.type === 'success' 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              <div className="flex items-center gap-3">
                 {message.type === 'success' ? <Rocket className="w-4 h-4" /> : <div className="w-1 h-1 bg-red-400 rounded-full"></div>}
                 <span className="text-sm font-medium">{message.text}</span>
              </div>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all font-medium"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all font-medium"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Mot de passe
              </label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Spécialité
              </label>
              <div className="relative">
                <Brain className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <select
                  value={registerData.passion}
                  onChange={(e) => setRegisterData({...registerData, passion: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all font-medium"
                >
                  <option value="DEV_FRONT">Frontend Developer</option>
                  <option value="DEV_BACK">Backend Developer</option>
                  <option value="DEV_FULLSTACK">Full-Stack Developer</option>
                  <option value="DEV_MOBILE">Mobile Developer</option>
                  <option value="DATA_SCIENCE">Data Scientist</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !registerData.name || !registerData.email || !registerData.password}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Créer mon compte
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Déjà un compte ?{' '}
              <Link
                className="text-blue-500 hover:text-blue-400 font-bold transition-colors ml-1"
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
}