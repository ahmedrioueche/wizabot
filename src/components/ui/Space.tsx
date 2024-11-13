import React from 'react';

const Space: React.FC<{ isDarkMode?: boolean; isNabula?: boolean; classname?: string }> = ({
  isDarkMode = true,
  isNabula = false,
  classname,
}) => {
  return (
    <div className={`relative ${classname}`}>
      {/* Space background with stars and nebula effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <div className="animate-twinkle absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className={`absolute h-px w-px ${isDarkMode ? 'bg-white' : 'bg-blue-600'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 1}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Nebula effect */}
        {isNabula && (
          <>
            <div
              className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-transparent' : 'bg-gradient-to-br from-blue-200/50 via-purple-200/30 to-transparent'}`}
            />
            <div
              className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-tl from-indigo-900/20 via-blue-900/20 to-transparent' : 'bg-gradient-to-tl from-purple-200/30 via-blue-200/30 to-transparent'}`}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Space;
