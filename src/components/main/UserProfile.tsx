import React, { useState } from 'react';
import { Edit2, Trash2, MessageCircle, Users, Activity, Calendar, MoreVertical, UserCircle, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { formatWhatsApp } from '../../utils/helper';
import { User } from '../../utils/types';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

// StatCard component with background, border, and shadow styling
const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`rounded-lg border p-4 shadow-md ${
        isDarkMode
          ? 'bg-dark-background border-dark-muted/30 shadow-dark'
          : 'bg-light-background border-light-muted/30 shadow-light'
      } backdrop-blur-sm transition-colors duration-300`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${isDarkMode ? 'bg-dark-primary/20' : 'bg-light-primary/20'}`}>{icon}</div>
        <div>
          <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>{label}</p>
          <p className={`text-xl font-semibold ${isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main UserProfile component
const UserProfile: React.FC<{ user?: User }> = ({ user }) => {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const handleOpenModal = (action: string) => {
    setModalContent(action);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const sampleUser: Partial<User> = {
    id: 1,
    name: 'John Doe',
    whatsappNumber: '+1234567890',
    creationDate: '2024-03-15',
    status: 'Active',
    whatsappBusinessId: 'wb_12345',
    activeUsers: 150,
    responseRate: '95%',
    totalConversations: '1,234',
  };

  const currentUser = user || sampleUser;

  const handleEdit = () => {
    console.log('Edit user:', currentUser.id);
  };

  const handleDelete = () => {
    console.log('Delete user:', currentUser.id);
  };

  return (
    <div
      className={`font-f1 scrollbar-thin scrollbar-thumb-rounded mt-12 min-h-screen p-8 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-background scrollbar-thumb-dark-muted hover:scrollbar-thumb-dark-text-secondary'
          : 'bg-light-background scrollbar-thumb-light-muted hover:scrollbar-thumb-light-text-secondary'
      }`}
    >
      {/* Content Wrapper */}
      <div className="relative mx-auto max-w-6xl">
        {/* Header Section */}
        <div
          className={`mb-8 rounded-xl border p-6 shadow-lg ${
            isDarkMode
              ? 'bg-dark-background border-dark-muted/30 shadow-dark'
              : 'bg-light-background border-light-muted/30 shadow-light'
          } backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex flex-row">
                <UserCircle className="text-light-primary dark:text-dark-primary mr-2 h-8 w-8" />
                <h1
                  className={`text-3xl font-bold ${isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                >
                  {currentUser.name}
                </h1>
              </div>
              {currentUser?.whatsappNumber && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{formatWhatsApp(currentUser?.whatsappNumber)}</span>
                </div>
              )}
            </div>
            <div className="hidden gap-3 md:flex">
              <button
                onClick={handleEdit}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                  isDarkMode
                    ? 'bg-dark-primary text-dark-text-primary hover:bg-dark-accentPrimary'
                    : 'bg-light-primary text-light-surface hover:bg-light-accentPrimary'
                }`}
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                  isDarkMode
                    ? 'text-dark-text-primary bg-red-600/90 hover:bg-red-700'
                    : 'text-light-surface bg-red-500 hover:bg-red-600'
                }`}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
            <div className="text-light-text-secondary dark:text-dark-text-primary flex md:hidden">
              <button onClick={() => handleOpenModal('Menu')} className="p-2">
                <MoreVertical size={24} />
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                currentUser.status?.toLowerCase() === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {currentUser.status}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Calendar className={isDarkMode ? 'text-dark-primary' : 'text-light-primary'} />}
            label="Member Since"
            value={new Date(currentUser.creationDate!).toLocaleDateString()}
          />
          <StatCard
            icon={<Users className={isDarkMode ? 'text-dark-primary' : 'text-light-primary'} />}
            label="Active Users"
            value={currentUser.activeUsers!}
          />
          <StatCard
            icon={<Activity className={isDarkMode ? 'text-dark-primary' : 'text-light-primary'} />}
            label="Response Rate"
            value={currentUser.responseRate!}
          />
          <StatCard
            icon={<MessageCircle className={isDarkMode ? 'text-dark-primary' : 'text-light-primary'} />}
            label="Total Conversations"
            value={currentUser.totalConversations!}
          />
        </div>

        {/* Additional Details */}
        <div
          className={`mt-8 rounded-xl border p-6 shadow-lg ${
            isDarkMode
              ? 'bg-dark-background border-dark-muted/30 shadow-dark'
              : 'bg-light-background border-light-muted/30 shadow-light'
          } backdrop-blur-sm`}
        >
          <div className="dark:text-dark-text-primary text-light-text-primary flex items-center">
            <div className={`-mt-3 rounded-full p-2 ${isDarkMode ? 'bg-dark-primary/20' : 'bg-light-primary/20'}`}>
              <Info className="text-light-primary dark:text-dark-primary" size={22} />
            </div>
            <h2 className="mb-4 ml-2 text-xl font-semibold">Account Details</h2> {/* Added ml-2 for spacing */}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className={isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                WhatsApp Business ID
              </p>
              <p className={isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary'}>
                {currentUser.whatsappBusinessId}
              </p>
            </div>
            <div>
              <p className={isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>Account ID</p>
              <p className={isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary'}>{currentUser.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
