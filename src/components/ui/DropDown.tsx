import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label }) => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-2 transition-colors ${
          isDarkMode
            ? 'bg-dark-surface/50 text-dark-text-primary hover:bg-dark-accentPrimary/20'
            : 'bg-light-surface/50 text-light-text-primary hover:bg-light-accentPrimary/20'
        }`}
      >
        {selectedOption || label}
        <ChevronDown className={isDarkMode ? 'text-dark-primary' : 'text-light-primary'} size={16} />
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-full rounded-lg shadow-lg ${
            isDarkMode ? 'bg-dark-surface/70' : 'bg-light-surface/70'
          }`}
        >
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full px-4 py-2 text-left transition-colors ${
                isDarkMode
                  ? 'text-dark-text-primary hover:bg-dark-primary/20'
                  : 'text-light-text-primary hover:bg-light-primary/20'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
