import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt, 
  FaTrophy, 
  FaUsers, 
  FaTasks, 
  FaStar,
  FaHome,
  FaCog,
  FaChevronDown
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simuler la vérification de l'état de connexion et des privilèges admin
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token) {
      setIsLoggedIn(true);
      if (userRole === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const handleLogin = () => {
    closeMenu();
    navigate('/login');
  };

  const handleRegister = () => {
    closeMenu();
    navigate('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMenuOpen(false);
    setIsAuthDropdownOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et bouton hamburger */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-purple-200 focus:outline-none focus:text-white md:hidden"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="flex-shrink-0 ml-4 md:ml-0">
              <Link to="/" className="text-xl font-bold flex items-center" onClick={closeMenu}>
                <FaTasks className="mr-2" />
                ChallengeHub
              </Link>
            </div>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
              >
                <FaHome className="mr-1" /> Accueil
              </Link>
              <Link 
                to="/challenges" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
              >
                <FaTasks className="mr-1" /> Challenges
              </Link>
              <Link 
                to="/leaderboard" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
              >
                <FaTrophy className="mr-1" /> Classement
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/profile/1"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
                  >
                    <FaUser className="mr-1" /> Profil
                  </Link>
                  
                  {isAdmin && (
                    <>
                      <Link 
                        to="/admin/users" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
                      >
                        <FaUsers className="mr-1" /> Gestion Users
                      </Link>
                      <Link 
                        to="/admin/challenges" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
                      >
                        <FaCog className="mr-1" /> Gestion Challenges
                      </Link>
                      <Link 
                        to="/admin/ratings" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 flex items-center"
                      >
                        <FaStar className="mr-1" /> Notes Challengers
                      </Link>
                    </>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 flex items-center"
                  >
                    <FaSignOutAlt className="mr-1" /> Déconnexion
                  </button>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleAuthDropdown}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 flex items-center"
                  >
                    Connexion <FaChevronDown className="ml-1" />
                  </button>
                  
                  {isAuthDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={handleLogin}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 w-full text-left flex items-center"
                      >
                        <FaSignInAlt className="mr-2" /> Se connecter
                      </button>
                      <button
                        onClick={handleRegister}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 w-full text-left flex items-center"
                      >
                        <FaUserPlus className="mr-2" /> S'inscrire
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-900">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
              onClick={closeMenu}
            >
              <FaHome className="mr-2" /> Accueil
            </Link>
            <Link 
              to="/challenges" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
              onClick={closeMenu}
            >
              <FaTasks className="mr-2" /> Challenges
            </Link>
            <Link 
              to="/leaderboard" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
              onClick={closeMenu}
            >
              <FaTrophy className="mr-2" /> Classement
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile/1" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
                  onClick={closeMenu}
                >
                  <FaUser className="mr-2" /> Profil
                </Link>
                
                {isAdmin && (
                  <>
                    <Link 
                      to="/admin/users" 
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
                      onClick={closeMenu}
                    >
                      <FaUsers className="mr-2" /> Gestion Utilisateurs
                    </Link>
                    <Link 
                      to="/admin/challenges" 
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
                      onClick={closeMenu}
                    >
                      <FaCog className="mr-2" /> Gestion Challenges
                    </Link>
                    <Link 
                      to="/admin/ratings" 
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 flex items-center"
                      onClick={closeMenu}
                    >
                      <FaStar className="mr-2" /> Notes Challengers
                    </Link>
                  </>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Déconnexion
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 flex items-center"
                >
                  <FaSignInAlt className="mr-2" /> Connexion
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 flex items-center"
                >
                  <FaUserPlus className="mr-2" /> Inscription
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