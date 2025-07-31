import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Trash2, Sparkles, Calendar, FileText, Tag } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const ViewNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notes, deleteNote, generateSummary, loading, error, clearError } = useNotes();

  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <div className="text-center py-16 px-4 sm:px-6">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Note not found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The note you're looking for doesn't exist or may have been deleted.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Notes</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note.id);
      navigate('/');
    }
  };

  const handleGenerateSummary = async () => {
    await generateSummary(note.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Navigation */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Notes</span>
        </Link>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleGenerateSummary}
            disabled={loading}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm"
          >
            {loading ? (
              <LoadingSpinner size="sm" className="text-indigo-600" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{loading ? 'Generating...' : 'AI Summary'}</span>
          </button>

          <Link
            to={`/note/${note.id}/edit`}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all duration-200 text-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Link>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage message={error} onClose={clearError} />
      )}

      {/* Note Content */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-xl shadow-indigo-500/5 dark:shadow-indigo-400/5 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200/60 dark:border-slate-700/60">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
            {note.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(note.createdAt)}</span>
            </div>
            
            {note.updatedAt !== note.createdAt && (
              <div className="flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Updated {formatDate(note.updatedAt)}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>{note.content.split(' ').length} words</span>
            </div>
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="flex items-start space-x-2 mt-4">
              <Tag className="w-4 h-4 text-slate-400 mt-1" />
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {note.content}
            </div>
          </div>
        </div>

        {/* AI Summary */}
        {note.summary && (
          <div className="p-6 sm:p-8 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-indigo-800 dark:text-indigo-200">
                  AI-Generated Summary
                </h3>
              </div>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed text-sm sm:text-base">
                {note.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
