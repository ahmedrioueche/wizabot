import React from 'react';
import { UserCircle, Bot } from 'lucide-react';
import { User } from '../../utils/types';
import { formatWhatsApp } from '../../utils/helper';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: Partial<User>;
  className?: string;
}

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-200 text-green-800';
    case 'inactive':
      return 'bg-red-200 text-red-800';
    case 'pending':
      return 'bg-yellow-200 text-yellow-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
const UserCard: React.FC<UserCardProps> = ({ user, className }) => {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleClick = () => {
    navigate(`/main/user/${user.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-light-background dark:bg-dark-background hover: dark:hover:shadow-dark-primary/30 w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="bg-light-primary/10 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20 flex h-16 w-16 items-center justify-center rounded-full border-2">
            <UserCircle className="text-light-primary dark:text-dark-primary h-10 w-10" />
          </div>
          <div>
            <h3 className="text-light-text-primary dark:text-dark-text-primary font-semibold">{user.name}</h3>
            <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(user.status!)}`}>
              {user.status?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 py-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Bot className="h-4 w-4" />
            <span>Chatbot ID: #{user.id?.toString().padStart(4, '0')}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{formatWhatsApp(user.whatsappNumber!)}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined {formatDate(user.creationDate!)}</span>
          </div>

          {/* New WhatsApp Business ID field */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>WhatsApp Business ID: {user.whatsappBusinessId}</span>
          </div>

          {/* Chatbot Statistics */}
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-200 pb-2 pt-4 dark:border-gray-700">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{user.totalConversations}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Conversations</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{user.activeUsers}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{user.responseRate}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Response Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
