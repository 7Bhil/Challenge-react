import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Challenges from '../pages/Challenges';
import Juries from '../pages/Juries';
import Settings from '../pages/Settings';
import NotificationsPage from '../pages/NotificationsPage';
import Layout from '../components/Layout/Layout';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/utilisateurs" element={<Users />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/jurys" element={<Juries />} />
        <Route path="/parametres" element={<Settings />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;