import React from 'react';
import { Terminal, Github,  Linkedin, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bhil$ DevChallenge
              </span>
            </Link>
            <p className="text-sm">
              Perfectionnez vos compétences, relevez des défis et rejoignez une communauté vibrante de développeurs.
            </p>
            <div className="flex space-x-4 mt-6">
  <a 
    href="https://github.com/7Bhil" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Github className="w-5 h-5" />
  </a>
  <a 
    href="https://wa.me/2290198874019" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-white transition-colors"
    title="Contact WhatsApp"
  >
    {/* Tu devras importer une icône WhatsApp ou utiliser une alternative */}
   <FaWhatsapp className="w-5 h-5" /> {/* Utilise Phone comme icône temporaire */}
  </a>
  <a 
    href="mailto:7bhilal.chitou7@gmail.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-white transition-colors"
    title="Envoyer un email"
  >
    <Mail className="w-5 h-5" /> {/* Ou utilise l'icône Mail */}
  </a>
  <a 
    href="https://linkedin.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Linkedin className="w-5 h-5" />
  </a>
</div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-blue-400 transition-colors">Défis</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-blue-400 transition-colors">Classement</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-blue-400 transition-colors">Communauté</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-blue-400 transition-colors">Support</Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">Confidentialité</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookies</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-blue-400 transition-colors">Sécurité</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm">
          &copy; {currentYear} DevChallenge. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;