import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2, ExternalLink, Mail, Trophy, Award, Info } from 'lucide-react';
import { notificationService } from '../../service/api';
import { Link } from 'react-router-dom';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Polling every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getAll();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
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
      case 'submission_graded': return <Award className="w-4 h-4 text-yellow-400" />;
      case 'badge_earned': return <Trophy className="w-4 h-4 text-purple-400" />;
      case 'challenge_created': return <ExternalLink className="w-4 h-4 text-blue-400" />;
      case 'info': return <Info className="w-4 h-4 text-cyan-400" />;
      default: return <Mail className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now - then;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return then.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-gray-950">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-gray-900/95 border border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="px-5 py-4 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/50">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded-full">
                  {unreadCount} news
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Check className="w-3 h-3" />
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-800/50">
                {notifications.map((notification) => (
                  <div 
                    key={notification._id}
                    className={`relative p-4 flex gap-3 hover:bg-gray-800/30 transition-colors group ${!notification.read ? 'bg-blue-500/5' : ''}`}
                  >
                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gray-800 border border-gray-700 ${!notification.read ? 'border-blue-500/30' : ''}`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                          {notification.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      
                      <p className={`text-sm leading-relaxed ${!notification.read ? 'text-white font-medium' : 'text-gray-400'}`}>
                        {notification.message}
                      </p>

                      {notification.link && (
                        <Link 
                          to={notification.link}
                          onClick={() => {
                            setIsOpen(false);
                            if (!notification.read) markAsRead(notification._id);
                          }}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Voir détails <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    {!notification.read && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification._id);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-300 hover:text-white transition-all"
                        title="Marquer comme lu"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 px-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                  <Bell className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-400">Aucune notification pour le moment</p>
                <p className="text-xs text-gray-500 mt-1">Vous serez informé quand il y aura du nouveau !</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-700/50 bg-gray-900/50">
            <Link 
              to="/notifications" 
              onClick={() => setIsOpen(false)}
              className="block w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            >
              Afficher toutes les notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
