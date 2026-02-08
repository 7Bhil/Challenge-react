/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  Trophy,
  Users,
  Code,
  Home,
  Settings,
  ChevronDown,
  Terminal,
  Bell,
  Search,
  Shield,
  Star,
  Zap,
  Brain,
  User,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRoleAvatar } from "../../service/api";
import { ROLE_CONFIG, getRoleData } from "../../data/roleConfig";
import NotificationCenter from "../notifications/NotificationCenter";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const dropRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer l'utilisateur réel depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const roleConfig = getRoleData(user.role);
  const Icon = roleConfig.icon;


  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
    // Optionnel: recharger la page pour s'assurer que tout l'état global est propre
    window.location.reload();
  };

  // Liens selon le rôle
  const getLinks = () => {
    const baseLinks = [
      { path: "/", label: "Home", Icon: Home },
      { path: "/challenges", label: "Challenges", Icon: Code },
    ];

    const role = user?.role;

    if (role === 'Superadmin') {
      return [
        ...baseLinks,
        { path: "/admin/users", label: "Gestion Users", Icon: Users },
        { path: "/admin/all-challenges", label: "Gestion Challenges", Icon: Shield },
        { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
        { path: "/community", label: "Community", Icon: Users },
      ];
    }

    if (role === 'Admin') {
      return [
        ...baseLinks,
        { path: "/admin/users", label: "Gestion Users", Icon: Users },
        { path: "/creation-challenge", label: "Créer Challenge", Icon: Code },
        { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
        { path: "/community", label: "Community", Icon: Users },
      ];
    }

    if (role === 'Jury') {
      return [
        ...baseLinks,
        { path: "/jury/dashboard", label: "Dashboard Jury", Icon: Star },
        { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
        { path: "/community", label: "Community", Icon: Users },
      ];
    }

    // Challenger (par défaut)
    return [
      ...baseLinks,
      { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
      { path: "/community", label: "Community", Icon: Users },
    ];
  };

  const links = getLinks();

  const active = (path) => location.pathname === path;

  const Item = ({ Icon, label, onClick, variant = "d" }) => {
    const variants = {
      d: "hover:bg-gray-800 text-gray-300 hover:text-white",
      a: "text-purple-300 hover:bg-purple-500/10 hover:text-white",
      j: "text-yellow-300 hover:bg-yellow-500/10 hover:text-white",
      s: "text-red-300 hover:bg-red-500/10 hover:text-white",
      r: "text-red-400 hover:bg-red-500/10 hover:text-white",
    };
    Icon = Icon || LogOut;
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-2 text-sm rounded-lg transition-all duration-200 ${variants[variant]}`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );
  };

  const role = user.role;
  const hasAdmin = role === "Superadmin" || role === "Admin" || role === "Jury";
  const isMgr = role === "Superadmin"; // Seul le Superadmin valide les challenges désormais

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300 rotate-3 group-hover:rotate-6">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-950 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              Bhil<span className="text-blue-500">$</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {links.map(({ path, label, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                active(path)
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${active(path) ? "animate-pulse" : ""}`} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-48 focus:w-64 transition-all duration-300 pl-10 pr-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-full text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:bg-gray-900 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="w-px h-8 bg-white/10" />

          {loggedIn ? (
            <div className="flex items-center gap-4">
              <NotificationCenter />

              {/* User Dropdown */}
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 group p-1 pl-3 pr-1 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="text-right hidden xl:block">
                    <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-end gap-1.5">
                      <Icon className={`w-4 h-4 ${roleConfig.textColor} ${roleConfig.isSpecial && user.role === 'Superadmin' ? 'animate-pulse' : ''}`} />
                      {user.name}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      Lvl {user.level || 1} • {user.points || 0}XP
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={getRoleAvatar(user)}
                      alt="avatar"
                      className={`w-10 h-10 rounded-full border-2 transition-all shadow-lg ${
                        roleConfig.isSpecial 
                          ? `${roleConfig.borderColor} ${roleConfig.shadowColor} scale-110` 
                          : 'border-gray-800'
                      } group-hover:border-blue-500/50`}
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-950 ${dropdownOpen ? 'bg-blue-500' : 'bg-gray-500'}`} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transform origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-5 bg-gradient-to-b from-white/5 to-transparent">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={getRoleAvatar(user)}
                          alt={user.name}
                          className="w-16 h-16 rounded-2xl border-4 border-gray-800 shadow-xl"
                        />
                        <div>
                          <h4 className="font-bold text-white text-lg">{user.name}</h4>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
                            {user.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 text-center">
                        <div className="flex-1 bg-black/20 rounded-xl p-2">
                          <div className="text-xl font-black text-white">{user.level || 1}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Niveau</div>
                        </div>
                        <div className="flex-1 bg-black/20 rounded-xl p-2">
                          <div className="text-xl font-black text-white">{user.points || 0}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Points</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <Item Icon={User} label="Mon Profil" onClick={() => navigate(`/profile/${user.id}`)} />
                      <Item Icon={Settings} label="Paramètres" onClick={() => navigate("/settings")} />
                      
                      {hasAdmin && (
                        <div className="my-2 p-2 bg-purple-500/5 rounded-xl border border-purple-500/10">
                          <div className="px-2 mb-2 text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <Shield className="w-3 h-3" /> Espace Admin
                          </div>
                          {isMgr && (
                            <Item Icon={Shield} label="Validation" onClick={() => navigate("/admin/validation")} variant="a" />
                          )}
                          {isJ && (
                            <Item Icon={Star} label="Notations" onClick={() => navigate("/jury/submissions")} variant="j" />
                          )}
                          {isSA && (
                            <>
                              <Item Icon={Users} label="Utilisateurs" onClick={() => navigate("/admin/users")} variant="a" />
                              <Item Icon={Code} label="Challenges" onClick={() => navigate("/admin/all-challenges")} variant="a" />
                            </>
                          )}
                        </div>
                      )}

                      <div className="h-px bg-white/5 my-1" />
                      <Item Icon={LogOut} label="Déconnexion" onClick={logout} variant="r" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-bold text-gray-300 hover:text-white transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-all"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 h-[calc(100vh-5rem)] bg-gray-950/95 backdrop-blur-xl border-t border-white/10 transition-all duration-500 ease-in-out z-40 ${
          menuOpen ? "translate-y-20 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ top: "0" }}
      >
        <div className="p-6 space-y-6 h-full overflow-y-auto">
          {loggedIn ? (
            <div 
              className="p-4 bg-gradient-to-br from-blue-600/10 to-violet-600/10 rounded-3xl border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => {
                navigate(`/profile/${user.id}`);
                setMenuOpen(false);
              }}
            >
              <img 
                src={getRoleAvatar(user)} 
                alt={user.name} 
                className={`w-16 h-16 rounded-2xl border-2 shadow-lg object-cover ${
                  roleConfig.isSpecial ? `${roleConfig.borderColor} ${roleConfig.shadowColor}` : 'border-blue-500/30'
                }`} 
              />
              <div className="flex-1">
                <div className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${roleConfig.textColor}`} />
                  {user.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-400 font-medium">Niveau {user.level || 1}</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">{user.role}</span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Menu</div>
            {links.map(({ path, label, Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-medium transition-all ${
                  active(path)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>

          {loggedIn && (
            <div className="space-y-2 pt-4 border-t border-white/5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Compte</div>
              <Link
                to={`/profile/${user.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
              >
                <User className="w-5 h-5" />
                Mon Profil
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
              >
                <Settings className="w-5 h-5" />
                Paramètres
              </Link>
            </div>
          )}

          {loggedIn ? (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Se déconnecter
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-gray-900 text-white font-bold border border-white/10 hover:bg-gray-800 transition-all"
              >
                <LogIn className="w-5 h-5" />
                Connexion
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/5"
              >
                <UserPlus className="w-5 h-5" />
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
