// Composant principal qui gère la navigation
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import Login from '../pages/signin/Login';
import Register from '../pages/signin/Register';
const AuthApp = () => {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <>
      {currentPage === 'login' && (
        <Login onSwitchToRegister={() => setCurrentPage('register')} />
      )}
      {currentPage === 'register' && (
        <Register onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </>
  );
};

export default AuthApp;