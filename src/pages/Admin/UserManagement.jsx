import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  User as UserIcon,
  MoreVertical,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { userService, adminService, getRoleAvatar } from "../../service/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Voulez-vous vraiment changer le rôle de cet utilisateur en ${newRole} ?`)) return;
    
    setActionLoading(userId);
    try {
      const response = await adminService.promoteUser(userId, newRole);
      if (response.success) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      }
    } catch (err) {
      alert("Erreur lors du changement de rôle");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Superadmin': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'Admin': return <ShieldCheck className="w-4 h-4 text-purple-500" />;
      case 'Jury': return <Shield className="w-4 h-4 text-yellow-500" />;
      default: return <UserIcon className="w-4 h-4 text-blue-500" />;
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Superadmin': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Admin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Jury': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12 pt-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-500" />
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-400">Gérez les rôles et les permissions des membres de la plateforme</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-3 py-1">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent border-none text-sm focus:outline-none text-gray-300"
              >
                <option value="All">Tous les rôles</option>
                <option value="Superadmin">Superadmin</option>
                <option value="Admin">Admin</option>
                <option value="Jury">Jury</option>
                <option value="Challenger">Challenger</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl shadow-2xl relative">
          <div className="overflow-x-auto rounded-3xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900/80 border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Utilisateur</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status & Rôle</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Stats</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {filteredUsers.length > 0 ? filteredUsers.map((user) => {
                  const isSelf = user._id === currentUser.id;
                  const isAdminAttemptingSAMod = currentUser.role === 'Admin' && user.role === 'Superadmin';
                  const canModify = !isSelf && !isAdminAttemptingSAMod;
                  
                  return (
                  <tr key={user._id} className={`hover:bg-gray-800/30 transition-colors group ${isSelf ? 'bg-purple-500/5' : ''}`}>
                    <td className="px-6 py-4">
                      {/* ... user info ... */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={getRoleAvatar(user)} 
                          className="w-10 h-10 rounded-full border border-gray-800"
                          alt={user.name}
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-purple-400 transition-colors">
                            {user.name}
                            {isSelf && <span className="ml-2 text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">Vous</span>}
                          </div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${getRoleBadgeClass(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs font-medium text-gray-400">Lvl {user.level || 1} • {user.points || 0} pts</div>
                        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{user.passion || 'Full-Stack'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <div className="relative group/menu">
                            <button 
                              disabled={!canModify}
                              className={`p-2 rounded-lg transition-all ${!canModify ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-800 text-gray-500 hover:text-white'}`}
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            {!isSelf && (
                              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50 p-2">
                                <div className="text-[10px] text-gray-500 font-bold px-3 py-2 uppercase tracking-widest border-b border-gray-800 mb-2">Changer le rôle</div>
                                {[
                                  { role: 'Challenger', label: 'Challenger', icon: UserIcon },
                                  { role: 'Jury', label: 'Jury', icon: Shield },
                                  { role: 'Admin', label: 'Admin', icon: ShieldCheck },
                                  // Superadmin option restricted for safety in this list
                                ].map((item) => (
                                  <button
                                    key={item.role}
                                    onClick={() => handleRoleChange(user._id, item.role)}
                                    disabled={actionLoading === user._id || user.role === item.role}
                                    className={`flex items-center gap-3 w-full px-3 py-2 text-xs rounded-lg transition-colors ${
                                      user.role === item.role 
                                      ? 'bg-purple-500/20 text-purple-400 cursor-default' 
                                      : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                                    }`}
                                  >
                                    <item.icon className="w-3.5 h-3.5" />
                                    {item.label}
                                  </button>
                                ))}
                              </div>
                            )}
                         </div>
                         <button 
                           disabled={isSelf}
                           className={`p-2 rounded-lg transition-all ${isSelf ? 'opacity-30 cursor-not-allowed' : 'hover:bg-red-500/10 text-gray-500 hover:text-red-400'}`}
                         >
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    </td>
                  </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <AlertTriangle className="w-10 h-10 text-gray-700" />
                        <div className="text-gray-500 font-medium">Aucun utilisateur trouvé</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
