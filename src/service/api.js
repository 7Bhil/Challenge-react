import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    if (error.response?.status === 401) {
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
  getAll: async () => {
    const response = await api.get('/challenges');
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
  }
};

// Fonction helper pour définir le token (rétrocompatibilité)
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export default api;
