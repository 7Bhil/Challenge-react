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
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRoleAvatar } from "../../service/api";
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
  
  // Si pas d'utilisateur mais token présent, on pourrait appeler checkAuth
  // Mais pour l'instant on se fie au localStorage mis à jour au login


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
      { path: "/notifications", label: "Notifications", Icon: Bell },
    ];

    const role = user?.role;

    if (role === 'Superadmin') {
      return [
        ...baseLinks,
        { path: "/admin/users", label: "Gestion Users", Icon: Users },
        { path: "/admin/all-challenges", label: "Gestion Challenges", Icon: Shield },
        { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
      ];
    }

    if (role === 'Admin') {
      return [
        ...baseLinks,
        { path: "/admin/users", label: "Gestion Users", Icon: Users },
        { path: "/creation-challenge", label: "Créer Challenge", Icon: Code },
        { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
      ];
    }

    if (role === 'Jury') {
      return [
        ...baseLinks,
        { path: "/jury/dashboard", label: "Dashboard Jury", Icon: Star },
        { path: "/leaderboard", label: "Leaderboard", Icon: Trophy },
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
  const isSA = role === "Superadmin";
  const isA = role === "Admin";
  const isJ = role === "Jury";
  const hasAdmin = isSA || isA || isJ;
  const isMgr = isSA; // Seul le Superadmin valide les challenges désormais

  return (
    <nav
      className={`fixed w-full top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/95 border-b border-gray-800 shadow-md"
          : "bg-gray-950/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bhil$
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map(({ path, label, Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active(path)
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            {loggedIn ? (
              <>
            {loggedIn && <NotificationCenter />}

                {/* Dropdown */}
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-800/50 text-gray-300 transition-all duration-200"
                  >
                    <div className="text-right text-sm leading-tight">
                      <div className="font-medium">{user.name || "Utilisateur"}</div>
                      <div className="text-xs text-gray-400">
                        Lvl {user.level || 1} • {user.points || 0}pts
                      </div>
                    </div>
                     <img
                      src={getRoleAvatar(user)}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-gray-700 shadow-sm"
                    />
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-gray-900/95 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                      <div className="px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name || 'User'}`}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border-2 border-blue-500/40"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-white truncate">
                              {user.name}
                            </div>
                            <div className="text-xs text-blue-400 truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <Item
                          Icon={User}
                          label="Profile"
                          onClick={() => navigate(`/profile/${user.id}`)}
                        />
                        <Item
                          Icon={Brain}
                          label="Dashboard"
                          onClick={() => navigate("/")}
                        />
                        <Item
                          Icon={Settings}
                          label="Settings"
                          onClick={() => navigate("/settings")}
                        />

                        {hasAdmin && (
                          <>
                            <div className="border-t border-gray-700 my-2" />
                            <div className="px-4 py-1">
                              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wide">
                                Admin Panel
                              </span>
                            </div>
                            {isMgr && (
                              <Item
                                Icon={Shield}
                                label="Validation Challenges"
                                onClick={() => navigate("/admin/validation")}
                                variant="a"
                              />
                            )}
                            {isJ && (
                              <Item
                                Icon={Star}
                                label="Review Submissions"
                                onClick={() => navigate("/jury/submissions")}
                                variant="j"
                              />
                            )}
                            {isSA && (
                              <>
                                <Item
                                  Icon={Users}
                                  label="Manage Users"
                                  onClick={() => navigate("/admin/users")}
                                  variant="a"
                                />
                                <Item
                                  Icon={Shield}
                                  label="Gestion Challenges"
                                  onClick={() => navigate("/admin/all-challenges")}
                                  variant="a"
                                />
                                <Item
                                  Icon={Zap}
                                  label="System Config"
                                  onClick={() => navigate("/admin/system")}
                                  variant="s"
                                />
                              </>
                            )}
                          </>
                        )}

                        <div className="border-t border-gray-700 my-2" />
                        <Item
                          Icon={LogOut}
                          label="Logout"
                          onClick={logout}
                          variant="r"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/20 transition-all duration-200 transform hover:scale-105"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
</div>
      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-16 bg-gray-900 border-t border-gray-800 shadow-2xl transition-all duration-300 ease-in-out transform ${
          menuOpen ? "h-[calc(100vh-4rem)] opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-5 py-6 space-y-6 overflow-y-auto h-full pb-20">
          {/* Mobile User Profile */}
          {loggedIn ? (
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
              <img
                src={getRoleAvatar(user)}
                alt={user.name}
                className="w-14 h-14 rounded-full border-2 border-blue-500/40 shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg truncate">
                  {user.name}
                </div>
                <div className="text-sm text-blue-400 font-medium">
                  Niveau {user.level || 1} • {user.points || 0} pts
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 hover:bg-gray-700 transition"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg transition"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-3 mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Navigation</span>
            </div>
            {links.map(({ path, label, Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  active(path)
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Admin Panel (Mobile) */}
          {loggedIn && hasAdmin && (
            <div className="space-y-1">
              <div className="px-3 mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Admin Panel</span>
              </div>
              {isSA && (
                <>
                  <Link
                    to="/admin/users"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-purple-300 hover:bg-purple-500/10 transition"
                  >
                    <Users className="w-5 h-5" />
                    Manage Users
                  </Link>
                  <Link
                    to="/admin/all-challenges"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-purple-300 hover:bg-purple-500/10 transition"
                  >
                    <Shield className="w-5 h-5" />
                    Gestion Challenges
                  </Link>
                </>
              )}
              {isMgr && (
                <Link
                  to="/admin/validation"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-purple-300 hover:bg-purple-500/10 transition"
                >
                  <Shield className="w-5 h-5" />
                  Validation Challenges
                </Link>
              )}
              {isJ && (
                <Link
                  to="/jury/submissions"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-yellow-300 hover:bg-yellow-500/10 transition"
                >
                  <Star className="w-5 h-5" />
                  Review Submissions
                </Link>
              )}
            </div>
          )}

          {/* Additional User Links (Mobile) */}
          {loggedIn && (
            <div className="space-y-1 pt-2">
               <div className="px-3 mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Compte</span>
              </div>
              <Link
                to={`/profile/${user.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <User className="w-5 h-5" />
                Mon Profil
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <Settings className="w-5 h-5" />
                Paramètres
              </Link>
              
              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-base font-bold text-red-400 hover:bg-red-500/10 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
