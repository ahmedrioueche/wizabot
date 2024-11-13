import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dict } from '../../utils/dict';
import { User } from '../../utils/types';
import UserCard from '../ui/UserCard';
import CustomDropdown from '../ui/SelectDropDown';
import { Search } from 'lucide-react';

const Users: React.FC = () => {
  const language = useLanguage();
  const text = dict[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Placeholder data for demonstration
  const users: Partial<User>[] = [
    {
      id: 1,
      name: 'Alice Smith',
      whatsappNumber: '+1234567890',
      creationDate: '2023-08-15',
      status: 'Active',
      whatsappBusinessId: 'BUS12345',
      activeUsers: 15,
      responseRate: '98%',
      totalConversations: '150',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      whatsappNumber: '+0987654321',
      creationDate: '2023-09-10',
      status: 'Active',
      whatsappBusinessId: 'BUS67890',
      activeUsers: 8,
      responseRate: '85%',
      totalConversations: '75',
    },
    {
      id: 3,
      name: 'Carol White',
      whatsappNumber: '+1112223333',
      creationDate: '2024-01-05',
      status: 'Active',
      whatsappBusinessId: 'BUS11223',
      activeUsers: 5,
      responseRate: '60%',
      totalConversations: '30',
    },
  ];

  // Filter and sort users based on searchQuery and sortBy
  const filteredUsers = users
    .filter(
      user => user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || user.whatsappNumber?.includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name?.localeCompare(b.name!) ?? 0;
      if (sortBy === 'joinDate') return new Date(b.creationDate!).getTime() - new Date(a.creationDate!).getTime() || 0;
      if (sortBy === 'activeUsers') return (b.activeUsers ?? 0) - (a.activeUsers ?? 0);
      return 0;
    });

  return (
    <div className="font-f1 mt-16 space-y-6 p-6">
      <div className="flex flex-row lg:items-center lg:justify-center">
        {/* Search Bar */}
        <div className="relative mr-4 w-full">
          <input
            type="text"
            placeholder={text.searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border-light-muted/30 dark:border-dark-muted/30 focus:ring-light-primary dark:focus:ring-dark-primary dark:text-dark-text-primary w-full rounded-lg border bg-transparent px-4 py-3 pl-10 text-sm outline-none focus:ring-1"
          />
          <Search className="text-light-text-secondary dark:text-dark-text-secondary absolute left-3 top-2.5 mt-0.5 h-4 w-4" />
        </div>
        {/* Filters */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <CustomDropdown
            options={text.sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder={text.sortBy}
            className="border-light-muted/30 dark:border-dark-muted/30 h-11 w-44 rounded-md border"
            bgColor="bg-light-background dark:bg-dark-background"
          />
        </div>
      </div>

      {/* Render UserCard for each user */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user: Partial<User>) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
