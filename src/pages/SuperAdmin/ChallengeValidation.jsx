import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Clock, 
  Calendar, 
  User as UserIcon, 
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { adminService } from "../../service/api";

const ChallengeValidation = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPendingChallenges();
  }, []);

  const fetchPendingChallenges = async () => {
    try {
      setLoading(true);
      const response = await adminService.getPendingChallenges();
      if (response.success) {
        setChallenges(response.data);
      }
    } catch (err) {
      setError("Erreur lors du chargement des challenges en attente");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Voulez-vous approuver ce challenge ? Il deviendra visible par tous.")) return;
    
    setActionLoading(id);
    try {
      const response = await adminService.approveChallenge(id);
      if (response.success) {
        setChallenges(challenges.filter(c => c._id !== id));
      }
    } catch (err) {
      alert("Erreur lors de l'approbation");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt("Raison du rejet (obligatoire) :");
    if (!reason) return;
    
    setActionLoading(id);
    try {
      const response = await adminService.rejectChallenge(id, reason);
      if (response.success) {
        setChallenges(challenges.filter(c => c._id !== id));
      }
    } catch (err) {
      alert("Erreur lors du rejet");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredChallenges = challenges.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12 pt-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
              Validation des Challenges
            </h1>
            <p className="text-gray-400">Passez en revue et validez les challenges créés par les admins</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Rechercher par titre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-72"
            />
          </div>
        </div>

        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredChallenges.map((challenge) => (
              <div key={challenge._id} className="bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all flex flex-col md:flex-row">
                {/* Info Section */}
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {challenge.difficulty}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      En attente
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3">{challenge.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {challenge.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-950 rounded-xl flex items-center justify-center text-gray-400 border border-gray-800">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Créateur</div>
                        <div className="text-sm font-medium">{challenge.createdBy?.name || "Admin"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-950 rounded-xl flex items-center justify-center text-gray-400 border border-gray-800">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Date de fin</div>
                        <div className="text-sm font-medium">{new Date(challenge.endDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions Section */}
                <div className="bg-gray-800/20 border-t md:border-t-0 md:border-l border-gray-800 p-8 flex flex-col justify-center gap-3 min-w-[240px]">
                  <button 
                    onClick={() => handleApprove(challenge._id)}
                    disabled={actionLoading === challenge._id}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all font-bold flex items-center justify-center gap-2 group"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Approuver
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => handleReject(challenge._id)}
                    disabled={actionLoading === challenge._id}
                    className="w-full py-3 bg-gray-900 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-gray-800 hover:border-red-500/20 rounded-xl transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Rejeter
                  </button>
                  <button className="w-full py-2 text-xs font-bold text-gray-500 hover:text-blue-400 transition-colors flex items-center justify-center gap-1.5">
                    <ExternalLink className="w-3 h-3" />
                    Voir les détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/30 border border-dashed border-gray-800 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
              <CheckCircle2 className="w-8 h-8 text-gray-700" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Tout est à jour !</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              Il n'y a aucun challenge en attente de validation pour le moment. Revenez plus tard !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeValidation;
