import React from 'react';
import StatCard from '../components/Dashboard/StatCard';
import TopChallengers from '../components/Dashboard/TopChallengers';
import Deadlines from '../components/Dashboard/Deadlines';
import Notifications from '../components/Dashboard/Notifications';
import { Users, Trophy, Shield, Activity } from 'lucide-react';

const Dashboard = () => {
  // Données mockées
  const stats = {
    users: 2847,
    challenges: 156,
    juries: 23,
    challengers: 1892
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Utilisateurs totaux"
          value={stats.users}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Challenges actifs"
          value={stats.challenges}
          icon={Trophy}
          color="bg-green-500"
        />
        <StatCard
          title="Jurys disponibles"
          value={stats.juries}
          icon={Shield}
          color="bg-purple-500"
        />
        <StatCard
          title="Challengers actifs"
          value={stats.challengers}
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <TopChallengers />
        <Deadlines />
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;