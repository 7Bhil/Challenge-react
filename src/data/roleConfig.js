import { ShieldAlert, ShieldCheck, Shield, User } from 'lucide-react';
import redditSuperUser from '../assets/redditsuperuser.png';

export const ROLE_CONFIG = {
  'Superadmin': {
    label: 'Superadmin',
    avatar: redditSuperUser, // Utilise l'image locale importée
    color: 'red-500',
    textColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-black',
    shadowColor: 'shadow-black',
    icon: ShieldAlert,
    isSpecial: true
  },
  'Admin': {
    label: 'Admin',
    avatar: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png', // Purple/Green Snoo (user requested Green vif)
    color: 'green-500',
    textColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    shadowColor: 'shadow-green-500/40',
    icon: ShieldCheck,
    isSpecial: true
  },
  'Jury': {
    label: 'Jury',
    avatar: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png', // Yellow Snoo
    color: 'yellow-500',
    textColor: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    shadowColor: 'shadow-yellow-500/20',
    icon: Shield,
    isSpecial: false
  },
  'Challenger': {
    label: 'Challenger',
    avatar: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png', // Blue/Green Snoo
    color: 'blue-500',
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    shadowColor: 'shadow-blue-500/20',
    icon: User,
    isSpecial: false
  }
};

export const getRoleData = (role) => {
  return ROLE_CONFIG[role] || ROLE_CONFIG['Challenger'];
};
