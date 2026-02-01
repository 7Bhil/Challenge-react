import axios from 'axios';

const isProduction = window.location.hostname !== 'localhost';
export const API_URL = isProduction 
  ? 'https://challenge-express.onrender.com/api' 
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

export const BASE_URL = API_URL.replace(/\/api$/, '');

// Instance axios avec configuration par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Éviter la redirection si on est déjà sur la page de login ou si c'est une erreur de login
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    const isLoginPage = window.location.pathname === '/login';

    if (error.response?.status === 401 && !isLoginRequest && !isLoginPage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// CHALLENGES
// ============================================

export const challengeService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/challenges?${params}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/challenges/${id}`);
    return response.data;
  },

  create: async (challengeData) => {
    const response = await api.post('/challenges', challengeData);
    return response.data;
  },

  update: async (id, challengeData) => {
    const response = await api.put(`/challenges/${id}`, challengeData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/challenges/${id}`);
    return response.data;
  },

  getLeaderboard: async (id) => {
    const response = await api.get(`/challenges/${id}/leaderboard`);
    return response.data;
  },

  volunteer: async (id) => {
    const response = await api.post(`/challenges/${id}/volunteer`);
    return response.data;
  },

  leaveJury: async (id) => {
    const response = await api.post(`/challenges/${id}/leave-jury`);
    return response.data;
  }
};

// ============================================
// SUBMISSIONS
// ============================================

export const submissionService = {
  create: async (submissionData) => {
    const response = await api.post('/submissions', submissionData);
    return response.data;
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/submissions?${params}`);
    return response.data;
  },

  getMySubmissions: async () => {
    const response = await api.get('/submissions/my-submissions');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/submissions/${id}`);
    return response.data;
  },

  score: async (submissionId, scoreData) => {
    const response = await api.post(`/submissions/${submissionId}/score`, scoreData);
    return response.data;
  },

  approve: async (id) => {
    const response = await api.patch(`/submissions/${id}/approve`);
    return response.data;
  },

  reject: async (id) => {
    const response = await api.patch(`/submissions/${id}/reject`);
    return response.data;
  }
};

// ============================================
// USERS
// ============================================

export const userService = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getLeaderboard: async () => {
    const response = await api.get('/users/leaderboard');
    return response.data;
  }
};

// ============================================
// AUTH
// ============================================

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  checkAuth: async () => {
    const response = await api.get('/auth/check');
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// ============================================
// NOTIFICATIONS
// ============================================

export const notificationService = {
  getAll: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  }
};

// ============================================
// ADMIN (Superadmin uniquement)
// ============================================

export const adminService = {
  // Promouvoir un utilisateur
  promoteUser: async (userId, newRole) => {
    const response = await api.post('/admin/users/promote', { userId, newRole });
    return response.data;
  },

  // Rétrograder un utilisateur
  demoteUser: async (userId, newRole) => {
    const response = await api.post('/admin/users/demote', { userId, newRole });
    return response.data;
  },

  // Récupérer les challenges en attente
  getPendingChallenges: async () => {
    const response = await api.get('/admin/challenges/pending');
    return response.data;
  },

  // Approuver un challenge
  approveChallenge: async (id) => {
    const response = await api.patch(`/admin/challenges/${id}/approve`);
    return response.data;
  },

  // Rejeter un challenge
  rejectChallenge: async (id, reason) => {
    const response = await api.patch(`/admin/challenges/${id}/reject`, { reason });
    return response.data;
  },

  // Statistiques
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Supprimer un challenge
  deleteChallenge: async (id) => {
    const response = await api.delete(`/admin/challenges/${id}`);
    return response.data;
  },

  // Supprimer un utilisateur
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};

// Fonction helper pour définir le token (rétrocompatibilité)
// Fonction helper pour obtenir l'avatar basé sur le rôle
export const getRoleAvatar = (user) => {
  if (!user) return `https://api.dicebear.com/7.x/bottts/svg?seed=guest`;
  
  const roleColors = {
    'Superadmin': '7c3aed', // Violet/Or (on part sur Violet vif)
    'Admin': '2563eb',      // Bleu
    'Jury': '16a34a',       // Vert
    'Challenger': '4b5563'  // Gris
  };

  const backgroundColor = roleColors[user.role] || '4b5563';
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}&backgroundColor=${backgroundColor}`;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export default api;
