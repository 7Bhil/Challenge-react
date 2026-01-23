import React from 'react';
import { Terminal, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
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
              Sharpen your skills, tackle challenges, and join a vibrant community of developers.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-blue-400 transition-colors">Challenges</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-blue-400 transition-colors">Leaderboard</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-blue-400 transition-colors">Community</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
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
              <li>
                <Link to="/api" className="hover:text-blue-400 transition-colors">API</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-blue-400 transition-colors">Security</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm">
          &copy; {currentYear} DevChallenge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;