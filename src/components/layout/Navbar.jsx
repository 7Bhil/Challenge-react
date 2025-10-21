import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, User, LogIn, UserPlus, LogOut, Trophy, Users,
  Code, Star, Home, Settings, ChevronDown, Terminal, Zap,
  Brain, Bell, Search, Shield, Award, Activity
} from "lucide-react";

const Navbar = () => {
  const [page, setPage] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // Toujours connecté
  const dropRef = useRef(null);

  // Données utilisateur statiques
  const user = {
    username: "JohnDoe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    level: 42,
    points: 15750,
    streak: 7,
    role: "Superadmin",
    _id: "123456"
  };

  // Effet pour le scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer dropdown en cliquant ailleurs
  useEffect(() => {
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Logout simulé
  const logout = () => {
    setLoggedIn(false);
    setMenuOpen(false);
    setDropdownOpen(false);
    setPage("/");
  };

  // Navigation
  const go = (path) => {
    setPage(path);
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const active = (path) => page === path;

  // Gestion des rôles
  const role = user?.role;
  const isSA = role === "Superadmin";
  const isA = role === "Admin";
  const isJ = role === "Jury";
  const hasAdmin = isSA || isA || isJ;
  const isMgr = isSA || isA;

  // Liens de navigation
  const links = [
    { p: "/", l: "Home", i: Home },
    { p: "/challenges", l: "Challenges", i: Code },
    { p: "/leaderboard", l: "Leaderboard", i: Trophy },
    { p: "/community", l: "Community", i: Users },
  ];

  // Composant Item réutilisable
  const Item = ({ i: I, l, o, v = "d" }) => {
    const cls = {
      d: "text-gray-300 hover:text-white hover:bg-gray-800",
      a: "text-purple-300 hover:text-white hover:bg-purple-500/10",
      j: "text-yellow-300 hover:text-white hover:bg-yellow-500/10",
      s: "text-red-300 hover:text-white hover:bg-red-500/10",
      r: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
    };
    return (
      <button onClick={o} className={`flex items-center gap-3 px-4 py-2 w-full text-left text-sm transition ${cls[v]}`}>
        <I className="w-4 h-4" />
        {l}
      </button>
    );
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-md border-b border-gray-800" : "bg-gray-950/80 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button onClick={() => go("/")} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Bhil$</span>
          </button>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(({ p, l, i: I }) => (
              <button
                key={p}
                onClick={() => go(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  active(p) ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <I className="w-4 h-4" />
                {l}
              </button>
            ))}
          </div>

          {/* Côté droit - Actions */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition"
              />
            </div>

            {loggedIn && user ? (
              <>
                {/* Notification Bell */}
                <button className="relative p-2 text-gray-400 hover:text-white transition">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </button>

                {/* Dropdown Utilisateur */}
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition"
                  >
                    <div className="text-right text-sm">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-xs text-gray-400">Lvl {user.level} • {user.points}pts</div>
                    </div>
                    <div className="relative">
                      <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-gray-700" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-950 text-xs flex items-center justify-center text-gray-900 font-bold">
                        {user.streak}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Contenu du Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                      {/* Header du profil */}
                      <div className="px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full border-2 border-blue-500/50" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white truncate">{user.username}</div>
                            <div className="text-xs text-blue-400 font-mono truncate">{user.email}</div>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Lvl {user.level}
                              </span>
                              <span className="flex items-center gap-1">
                                <Zap className="w-3 h-3 text-yellow-400" />
                                {user.points}
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3 text-green-400" />
                                {user.streak}d
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu utilisateur */}
                      <div className="py-2">
                        <Item i={User} l="View Profile" o={() => go(`/profile/${user._id}`)} />
                        <Item i={Brain} l="Dashboard" o={() => go("/dashboard")} />
                        <Item i={Settings} l="Settings" o={() => go("/settings")} />

                        {/* Panel Admin */}
                        {hasAdmin && (
                          <>
                            <div className="border-t border-gray-700 my-2" />
                            <div className="px-4 py-1">
                              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wide">Admin Panel</span>
                            </div>
                            {isMgr && <Item i={Shield} l="Manage Challenges" o={() => go("/admin/challenges")} v="a" />}
                            {isJ && <Item i={Star} l="Review Submissions" o={() => go("/admin/ratings")} v="j" />}
                            {isSA && (
                              <>
                                <Item i={Users} l="Manage Users" o={() => go("/admin/users")} v="a" />
                                <Item i={Zap} l="System Config" o={() => go("/admin/system-config")} v="s" />
                              </>
                            )}
                          </>
                        )}

                        <div className="border-t border-gray-700 my-2" />
                        <Item i={LogOut} l="Logout" o={logout} v="r" />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Boutons Login/Signup */
              <div className="flex items-center gap-3">
                <button onClick={() => setLoggedIn(true)} className="px-4 py-2 text-gray-300 hover:text-white font-medium transition flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button onClick={() => setLoggedIn(true)} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-400 hover:text-white transition">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-2">
            {/* Liens navigation mobile */}
            {links.map(({ p, l, i: I }) => (
              <button
                key={p}
                onClick={() => go(p)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  active(p) ? "bg-blue-500/20 text-blue-400" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <I className="w-4 h-4" />
                {l}
              </button>
            ))}

            {/* Utilisateur connecté - Mobile */}
            {loggedIn && user ? (
              <>
                <div className="border-t border-gray-700 my-3" />
                <div className="px-4 py-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border-2 border-blue-500/50" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{user.username}</div>
                      <div className="text-xs text-gray-400">Lvl {user.level} • {user.points}pts</div>
                    </div>
                  </div>
                </div>
                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              /* Login/Signup Mobile */
              <>
                <div className="border-t border-gray-700 my-3" />
                <button onClick={() => setLoggedIn(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button onClick={() => setLoggedIn(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;