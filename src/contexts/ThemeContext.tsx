import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme } from '../types';
import { localStorage } from '../utils/localStorage';

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved !== null ? saved : prefersDark;
  });

  useEffect(() => {
    localStorage.saveTheme(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};