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
        { path: "/admin/validation", label: "Validation", Icon: Shield },
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
        { path: "/jury/submissions", label: "Notations", Icon: Star },
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
  const isMgr = isSA || isA;

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
          <div className="hidden md:flex items-center space-x-1">
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
          <div className="hidden md:flex items-center space-x-4">
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
                <button className="relative p-2 text-gray-400 hover:text-white transition">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </button>

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
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-gray-700"
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
                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`}
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
                          onClick={() => navigate("/dashboard")}
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
                                label="Manage Challenges"
                                onClick={() => navigate("/admin/challenges")}
                                variant="a"
                              />
                            )}
                            {isJ && (
                              <Item
                                Icon={Star}
                                label="Review Submissions"
                                onClick={() => navigate("/admin/reviews")}
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
            className="md:hidden p-2 text-gray-400 hover:text-white transition"
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
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {links.map(({ path, label, Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  active(path)
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}

            {loggedIn && (
              <>
                <div className="border-t border-gray-700 my-3" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
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
