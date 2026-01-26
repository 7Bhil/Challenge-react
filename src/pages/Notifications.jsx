import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  ExternalLink, 
  Trophy, 
  Award, 
  Info, 
  Clock, 
  Filter,
  MoreVertical,
  CheckCheck
} from 'lucide-react';
import { notificationService } from '../service/api';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'important'

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getAll();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'submission_graded': return <Award className="w-6 h-6 text-yellow-400" />;
      case 'badge_earned': return <Trophy className="w-6 h-6 text-purple-400" />;
      case 'challenge_created': return <ExternalLink className="w-6 h-6 text-blue-400" />;
      case 'info': return <Info className="w-6 h-6 text-cyan-400" />;
      default: return <Bell className="w-6 h-6 text-gray-400" />;
    }
  };

  const formatFullDate = (date) => {
    return new Date(date).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <Bell className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Notifications
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Suivez l'actualité de vos défis et vos récompenses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-all duration-200"
              >
                <CheckCheck className="w-4 h-4" />
                Tout marquer comme lu
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-900/40 border border-gray-800/60 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
          {/* Tabs/Filters */}
          <div className="flex items-center gap-6 px-8 py-4 border-b border-gray-800/60 bg-gray-900/20">
            <button 
              onClick={() => setFilter('all')}
              className={`text-sm font-bold transition-all relative py-2 ${filter === 'all' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Toutes
              {filter === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />}
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`text-sm font-bold transition-all relative py-2 flex items-center gap-2 ${filter === 'unread' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Non lues
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded-md">
                  {unreadCount}
                </span>
              )}
              {filter === 'unread' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />}
            </button>
          </div>

          {/* List */}
          <div className="divide-y divide-gray-800/40">
            {loading ? (
              // Loading Skeleton
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="p-8 animate-pulse flex gap-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-800 rounded w-1/4" />
                    <div className="h-6 bg-gray-800 rounded w-3/4" />
                    <div className="h-4 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification._id}
                  className={`group relative p-8 flex flex-col sm:flex-row gap-6 transition-all duration-300 hover:bg-gray-800/20 ${!notification.read ? 'bg-blue-500/5' : ''}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${!notification.read ? 'bg-gray-800 border-blue-500/30' : 'bg-gray-900 border-gray-800'}`}>
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                        {notification.type.replace('_', ' ')}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {formatFullDate(notification.createdAt)}
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold mb-3 leading-snug ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                      {notification.message}
                    </h3>

                    <div className="flex items-center gap-4">
                      {notification.link && (
                        <Link 
                          to={notification.link}
                          onClick={() => {
                            if (!notification.read) markAsRead(notification._id);
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                        >
                          Voir détails
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          Marquer comme lu
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Desktop Only Dot */}
                  {!notification.read && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Empty State
              <div className="py-24 px-8 text-center bg-gray-900/10">
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800 shadow-inner">
                  <Bell className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Tout est calme</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Aucune notification ne correspond à vos critères. Revenez plus tard !
                </p>
                {filter !== 'all' && (
                  <button 
                    onClick={() => setFilter('all')}
                    className="mt-6 text-blue-400 font-bold hover:text-blue-300 underline underline-offset-4"
                  >
                    Voir toutes les notifications
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-gray-600 text-xs font-medium uppercase tracking-widest">
          Système de notification Bhil$ • v2.0
        </p>
      </div>
    </div>
  );
};

export default NotificationsPage;
