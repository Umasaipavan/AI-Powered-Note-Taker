import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Sparkles } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';
import { NoteCard } from '../components/NoteCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const Home: React.FC = () => {
  const { notes, loading, error, clearError } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = notes.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Sort notes
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [notes, searchTerm, sortBy]);

  if (loading && notes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Your AI-Powered Notes
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Capture your thoughts, get AI summaries, and organize your ideas with ease
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage message={error} onClose={clearError} />
      )}

      {/* Search and Filters */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {notes.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Total Notes
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {notes.filter(note => note.summary).length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                AI Summaries
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">W</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {notes.reduce((total, note) => total + note.content.split(' ').length, 0)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Total Words
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredAndSortedNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-12 max-w-md mx-auto">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              No notes yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Start capturing your thoughts and ideas with AI-powered summaries
            </p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Note</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-12 max-w-md mx-auto">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              No notes found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              Clear search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};