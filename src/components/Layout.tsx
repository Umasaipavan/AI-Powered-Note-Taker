import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Plus, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggle } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-200"
            >
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/60 transition-colors">
                <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  AI Notes
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Smart note taking
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/'
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Notes</span>
              </Link>

              <Link
                to="/create"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/create'
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Create</span>
              </Link>

              <button
                onClick={toggle}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-110"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};