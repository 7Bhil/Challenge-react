# Challenge Platform - Frontend

L'interface utilisateur moderne et dynamique de la plateforme de challenges, construite avec React et Vite.

## 🚀 Technologies utilisées

- **React 19** : Bibliothèque frontend.
- **Vite** : Outil de build ultra-rapide.
- **Tailwind CSS** : Framework CSS utilitaire pour le design.
- **Lucide React** & **React Icons** : Bibliothèques d'icônes.
- **Axios** : Client HTTP pour communiquer avec l'API.
- **React Router Dom** : Gestion de la navigation.

## 📁 Structure du projet

```text
client/
├── src/
│   ├── components/ # Composants réutilisables (Navbar, Cards, Forms)
│   ├── pages/      # Pages complètes (Home, Challenges, Admin)
│   ├── service/    # Instance Axios et appels API
│   ├── routes/     # Configuration du routage
│   ├── App.jsx     # Composant racine
│   └── main.jsx    # Point d'entrée
├── public/         # Assets statiques
└── tailwind.config.js # Configuration Tailwind
```

## ⚙️ Installation

1. Accédez au dossier client :
   ```bash
   cd client
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` si nécessaire :
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```

## ✨ Fonctionnalités clés

- **Mode Sombre** : Design premium et futuriste.
- **Tableau de Bord** : Vue d'ensemble des stats et challenges.
- **Classement (Leaderboard)** : Gamification en temps réel.
- **Notation Jury** : Interface dédiée pour évaluer les projets.
- **Filtres de Deadline** : Masquage automatique des challenges expirés.
