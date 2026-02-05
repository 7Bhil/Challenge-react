import { useState } from 'react';
import { User, Mail, Heart, Save, ArrowLeft, Camera, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { userService, authService, getRoleAvatar } from '../service/api';

const Settings = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    passion: currentUser?.passion || '',
    avatar: currentUser?.avatar || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const response = await userService.updateProfile(formData);
      if (response.success) {
        setSuccess('Profil mis à jour avec succès !');
        // Mettre à jour le localStorage
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Rediriger après un court délai
        setTimeout(() => {
          navigate(`/profile/${updatedUser.id || updatedUser._id}`);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12 pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to={`/profile/${currentUser?.id || currentUser?._id}`}
            className="p-2 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold">Paramètres du profil</h1>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-8">
             <div className="relative group cursor-pointer mb-4">
               <img 
                 src={formData.avatar || getRoleAvatar(currentUser)} 
                 alt="Avatar" 
                 className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-xl"
               />
               <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera className="w-6 h-6 text-white" />
               </div>
             </div>
             <p className="text-sm text-gray-500">
               L'avatar est généré automatiquement ou peut être défini par une URL
             </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Nom d'utilisateur</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-600"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-600"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-800">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sécurité</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Nouveau mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-600"
                    placeholder="Laisser vide pour ne pas changer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-600"
                    placeholder="Répétez le mot de passe"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
