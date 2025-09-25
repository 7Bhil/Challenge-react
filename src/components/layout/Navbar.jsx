import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Trophy,
  Users,
  Code,
  Star,
  Home,
  Settings,
  ChevronDown,
  Terminal,
  Zap,
  Brain,
  Bell,
  Search,
  Shield,
  Award,
  Activity,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Décommenté

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Décommenté
  const location = useLocation(); // Décommenté
  const dropdownRef = useRef(null);

  // Mock user data
  const userData = {
    name: "Alex Chen",
    username: "@alexdev",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    level: 42,
    points: 2850,
    streak: 7,
  };

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check auth status
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (token) {
      setIsLoggedIn(true);
      if (userRole === "admin") {
        setIsAdmin(true);
      }
    } else {
      // Ajouté pour réinitialiser l'état si l'utilisateur se déconnecte
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [location.pathname]); // Dépend de location.pathname pour réagir aux changements d'URL

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate("/login"); // Décommenté
    console.log("Navigate to login");
  };

  const handleRegister = () => {
    setIsMenuOpen(false);
    navigate("/register"); // Décommenté
    console.log("Navigate to register");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    navigate("/"); // Décommenté
    console.log("Logout and navigate to home");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const isActiveLink = (path) => {
    return location.pathname === path; // Utilise location de useLocation
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link // Changé de <a> à <Link>
              to="/home"
              className="flex items-center gap-3 group"
              onClick={closeMenu}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevChallenge
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link // Changé de <a> à <Link>
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActiveLink("/")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link // Changé de <a> à <Link>
              to="/challenges"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActiveLink("/challenges")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Code className="w-4 h-4" />
              Challenges
            </Link>

            <Link // Changé de <a> à <Link>
              to="/leaderboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActiveLink("/leaderboard")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Link>

            <Link
              to="/community"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActiveLink("/community")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Users className="w-4 h-4" />
              Community
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all"
              />
            </div>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-3 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <div className="font-medium">{userData.name}</div>
                        <div className="text-xs text-gray-400">
                          Lvl {userData.level} • {userData.points}pts
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={userData.avatar}
                          alt={userData.name}
                          className="w-8 h-8 rounded-full border border-gray-700"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-950 text-xs flex items-center justify-center text-gray-900 font-bold">
                          {userData.streak}
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                          <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-12 h-12 rounded-full border border-gray-600"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">
                              {userData.name}
                            </div>
                            <div className="text-sm text-blue-400 font-mono">
                              {userData.username}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Level {userData.level}
                              </span>
                              <span className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {userData.points} points
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                {userData.streak} day streak
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile/1"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          View Profile
                        </Link>

                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Brain className="w-4 h-4" />
                          Dashboard
                        </Link>

                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>

                        {isAdmin && (
                          <>
                            <div className="border-t border-gray-700 my-2"></div>
                            <div className="px-4 py-1">
                              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                Admin Panel
                              </span>
                            </div>
                            <Link
                              to="/admin/users"
                              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Users className="w-4 h-4" />
                              Manage Users
                            </Link>
                            <Link
                              to="/admin/challenges"
                              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Shield className="w-4 h-4" />
                              Manage Challenges
                            </Link>
                            <Link
                              to="/admin/ratings"
                              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Star className="w-4 h-4" />
                              Review Submissions
                            </Link>
                          </>
                        )}

                        <div className="border-t border-gray-700 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-4 py-4 space-y-2 bg-gray-950/95 backdrop-blur-md">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Navigation Links */}
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                isActiveLink("/")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            <Link
              to="/challenges"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                isActiveLink("/challenges")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              <Code className="w-5 h-5" />
              Challenges
            </Link>

            <Link
              to="/leaderboard"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                isActiveLink("/leaderboard")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              <Trophy className="w-5 h-5" />
              Leaderboard
            </Link>

            <Link
              to="/community"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                isActiveLink("/community")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              <Users className="w-5 h-5" />
              Community
            </Link>

            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-700 my-4"></div>

                {/* Mobile User Info */}
                <div className="flex items-center gap-3 px-3 py-3 bg-gray-800/50 rounded-lg">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-10 h-10 rounded-full border border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white">
                      {userData.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      Level {userData.level} • {userData.points} points
                    </div>
                  </div>
                </div>

                <Link
                  to="/profile/1"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
                  onClick={closeMenu}
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
                  onClick={closeMenu}
                >
                  <Brain className="w-5 h-5" />
                  Dashboard
                </Link>

                {isAdmin && (
                  <>
                    <div className="border-t border-gray-700 my-2"></div>
                    <div className="px-3 py-1">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        Admin
                      </span>
                    </div>
                    <Link
                      to="/admin/users"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
                      onClick={closeMenu}
                    >
                      <Users className="w-5 h-5" />
                      Manage Users
                    </Link>
                    <Link
                      to="/admin/challenges"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
                      onClick={closeMenu}
                    >
                      <Shield className="w-5 h-5" />
                      Manage Challenges
                    </Link>
                    <Link
                      to="/admin/ratings"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
                      onClick={closeMenu}
                    >
                      <Star className="w-5 h-5" />
                      Review Submissions
                    </Link>
                  </>
                )}

                <div className="border-t border-gray-700 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 font-medium transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-700 my-4"></div>
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  <UserPlus className="w-5 h-5" />
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
