import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: 'newest' | 'oldest' | 'title';
  onSortChange: (sort: 'newest' | 'oldest' | 'title') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center space-x-2 px-4 py-3 border rounded-lg transition-all duration-200 ${
            showFilters
              ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300'
              : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Sort by:
            </span>
            <div className="flex space-x-2">
              {[
                { value: 'newest' as const, label: 'Newest' },
                { value: 'oldest' as const, label: 'Oldest' },
                { value: 'title' as const, label: 'Title' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onSortChange(value)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    sortBy === value
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};