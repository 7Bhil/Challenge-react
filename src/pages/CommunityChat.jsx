import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Send, User as UserIcon, Shield, Star, Rocket, MessageSquare, Info, Crown, Scale } from 'lucide-react';
import api, { getRoleAvatar, BASE_URL } from '../service/api';

// Initialize socket outside component to prevent multiple connections
const socket = io(BASE_URL);

const CommunityChat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    // Fetch message history
    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages/community_general');
        if (response.data.success) {
          setMessageList(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };
    fetchMessages();

    // Join the general community room
    socket.emit('join_room', 'community_general');

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Cleanup
    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "" && user) {
      const messageData = {
        room: 'community_general',
        author: user.name,
        authorId: user.id || user._id,
        role: user.role,
        message: currentMessage,
        avatar: getRoleAvatar(user),
        time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit('send_message', messageData);
      // Optimistically add message for sender? No, let's wait for socket echo to keep sync or add immediately if preferred.
      // Socket.io echoes to everyone in room including sender if using io.to().emit().
      // If server uses socket.broadcast.to().emit(), sender needs to add manually.
      // In my server implementation: io.to(data.room).emit, so it sends to everyone including sender.
      
      setCurrentMessage("");
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Superadmin':
        return <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold uppercase flex items-center gap-1"><Crown className="w-3 h-3" /> Superadmin</span>;
      case 'Admin':
        return <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>;
      case 'Jury':
        return <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase flex items-center gap-1"><Scale className="w-3 h-3" /> Jury</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase flex items-center gap-1"><Star className="w-3 h-3" /> Challenger</span>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-900 rounded-3xl border border-gray-800">
          <MessageSquare className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Communauté inaccessible</h2>
          <p className="text-gray-400 mb-6">Vous devez être connecté pour accéder au chat communautaire.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
        
        {/* Chat Header */}
        <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Community Chat <span className="text-blue-500">Live</span></h1>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                En ligne • Posez vos questions, aidez les autres
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400 border border-gray-700">
              #general
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-950/30">
          {messageList.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <Info className="w-12 h-12 text-gray-600 mb-2" />
                <p className="text-gray-500">Le chat est calme... Soyez le premier à dire bonjour ! 👋</p>
             </div>
          )}
          
          {messageList.map((msg, index) => {
            const isMe = msg.author === user.name;
            return (
              <div 
                key={index} 
                className={`flex gap-4 ${isMe ? 'flex-row-reverse' : 'flex-row'} group animate-in slide-in-from-bottom-2 duration-300`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 pt-1">
                   <img 
                     src={msg.avatar} 
                     alt={msg.author} 
                     className={`w-10 h-10 rounded-full border-2 ${isMe ? 'border-blue-500' : 'border-gray-700'} shadow-md`}
                   />
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className={`text-xs font-bold ${isMe ? 'text-blue-400' : 'text-gray-300'}`}>
                      {msg.author}
                    </span>
                    {getRoleBadge(msg.role)}
                    <span className="text-[10px] text-gray-600">{msg.time}</span>
                  </div>
                  
                  <div 
                    className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : msg.role === 'Superadmin'
                          ? 'bg-red-500/10 text-red-100 border border-red-500/20 rounded-tl-none'
                          : msg.role === 'Admin'
                            ? 'bg-green-500/10 text-green-100 border border-green-500/20 rounded-tl-none'
                            : msg.role === 'Jury'
                              ? 'bg-yellow-500/10 text-yellow-100 border border-yellow-500/20 rounded-tl-none'
                              : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900 border-t border-gray-800">
          <form onSubmit={sendMessage} className="flex gap-4 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentMessage}
                onChange={(event) => setCurrentMessage(event.target.value)}
                placeholder="Écrivez votre message ici..."
                className="w-full pl-5 pr-12 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none shadow-inner"
              />
            </div>
            <button 
              type="submit"
              disabled={!currentMessage.trim()}
              className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-600">
               Respectez les règles de la communauté. Soyez courtois et professionnel.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
