import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Code, 
  Terminal, 
  Rocket, 
  ArrowLeft,
  Info,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Star,
  Trophy,
  Coins,
  Award,
  Lock as LockIcon
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { challengeService } from '../../service/api';

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    difficulty: 'Moyen',
    technologies: '',
    xpPoints: 0,
    financialReward: 0,
    submissionType: 'full', // 'full', 'file', 'password'
    correctPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Remove any non-digit characters except decimal point
    const numericValue = value.replace(/[^\d]/g, '');
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  const formatNumber = (num) => {
    return parseInt(num || 0).toLocaleString('fr-FR');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await challengeService.create(formData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => navigate('/challenges'), 2000);
      }
    } catch (error) {
      console.error('Erreur creation:', error);
      alert('Une erreur est survenue lors de la création.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20 pt-24 font-sans">
      <div className="max-w-4xl mx-auto px-5">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour Accueil</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" /> Admin Mode
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Header & Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight leading-tight">
                Propulsez un <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Nouveau Challenge</span>
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Créez une expérience unique pour la communauté. Définissez les règles, les technos et inspirez les développeurs.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-3xl space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Récompenses Intelligentes</div>
                  <div className="text-xs text-gray-500">
                    Combinez XP et primes pour maximiser l'engagement. Les XP boostent le classement, les primes motivent financièrement.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Qualité Code</div>
                  <div className="text-xs text-gray-500">Favorisez les tests et les bonnes pratiques pour de meilleurs scores.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
              
              {success ? (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6 border border-green-500/30">
                    <Rocket className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Félicitations !</h2>
                  <p className="text-gray-400 text-center">Votre challenge a été créé avec succès et est en attente de validation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Titre du Projet</label>
                      <div className="relative group/input">
                        <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" />
                        <input 
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder="Ex: Système de Chat décentralisé..."
                          className="w-full pl-12 pr-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Description & Objectifs</label>
                       <textarea 
                         name="description"
                         value={formData.description}
                         onChange={handleChange}
                         required
                         rows={4}
                         placeholder="Quels sont les enjeux de ce challenge ?"
                         className="w-full px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-700 resize-none"
                       />
                    </div>

                    {/* Meta Grid - Difficulty & Technologies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Difficulté</label>
                        <select 
                          name="difficulty"
                          value={formData.difficulty}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Facile">Facile</option>
                          <option value="Moyen">Moyen</option>
                          <option value="Difficile">Difficile</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Technologies</label>
                        <div className="relative group/input">
                          <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                          <input 
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            placeholder="React, Redis, Rust..."
                            className="w-full pl-12 pr-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rewards Section */}
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <Trophy className="w-4 h-4" /> Récompenses
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <Zap className="w-5 h-5 text-yellow-400" />
                              <span className="text-sm text-gray-400 font-medium">XP</span>
                            </div>
                            <input 
                              type="text"
                              name="xpPoints"
                              value={formatNumber(formData.xpPoints)}
                              onChange={handleNumberChange}
                              placeholder="500"
                              className="w-full pl-24 pr-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700 text-right text-lg font-bold"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <Coins className="w-5 h-5 text-green-400" />
                              <span className="text-sm text-gray-400 font-medium">Cash</span>
                            </div>
                            <input 
                              type="text"
                              name="financialReward"
                              value={formatNumber(formData.financialReward)}
                              onChange={handleNumberChange}
                              placeholder="50,000"
                              className="w-full pl-24 pr-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-gray-700 text-right text-lg font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submission Type Section */}
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <Rocket className="w-4 h-4" /> Type de Soumission Attendue
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'full', label: 'Complet', desc: 'GitHub + Live URL', icon: Code },
                          { id: 'file', label: 'Fichier', desc: 'Lien simple fichier', icon: Info },
                          { id: 'password', label: 'Password', desc: 'Clé / Mot de passe', icon: LockIcon }
                        ].map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, submissionType: type.id }))}
                              className={`p-4 rounded-2xl border text-left transition-all ${
                                formData.submissionType === type.id 
                                  ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20' 
                                  : 'bg-gray-950 border-gray-800 hover:border-gray-700'
                              }`}
                            >
                              <Icon className={`w-5 h-5 mb-2 ${formData.submissionType === type.id ? 'text-blue-400' : 'text-gray-500'}`} />
                              <div className={`text-sm font-bold ${formData.submissionType === type.id ? 'text-white' : 'text-gray-400'}`}>{type.label}</div>
                              <div className="text-[10px] text-gray-600 mt-1">{type.desc}</div>
                            </button>
                          );
                        })}
                      </div>

                      {formData.submissionType === 'password' && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="p-5 bg-gray-950 border border-gray-800 rounded-2xl space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Mot de passe de validation (Optionnel)</label>
                            <input 
                              type="text"
                              name="correctPassword"
                              value={formData.correctPassword}
                              onChange={handleChange}
                              placeholder="Entrez la clé attendue..."
                              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm font-mono"
                            />
                            <p className="text-[10px] text-gray-500 italic">
                              Si rempli, le système validera automatiquement la soumission si la clé correspond.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Lancement</label>
                         <div className="relative">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                           <input 
                             type="datetime-local"
                             name="startDate"
                             value={formData.startDate}
                             onChange={handleChange}
                             required
                             className="w-full pl-12 pr-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none text-sm"
                           />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Deadline</label>
                         <div className="relative">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                           <input 
                             type="datetime-local"
                             name="endDate"
                             value={formData.endDate}
                             onChange={handleChange}
                             required
                             className="w-full pl-12 pr-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl focus:outline-none text-sm"
                           />
                         </div>
                       </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full group relative overflow-hidden px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-lg rounded-2xl transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Déployer le Challenge</span>
                          <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-gray-500 text-[10px] mt-4 uppercase tracking-[0.2em] font-medium">
                      Les challenges sont soumis à validation par les SuperAdmins
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;