import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const LanguageContext = createContext<string>('en'); // Default value for context

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en'); // Default to 'en'

  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): string => {
  return useContext(LanguageContext);
};
