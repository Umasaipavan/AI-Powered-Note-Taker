import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit3, Trash2, Sparkles, FileText } from 'lucide-react';
import { Note } from '../types';
import { useNotes } from '../contexts/NotesContext';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { deleteNote, generateSummary, loading } = useNotes();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note.id);
    }
  };

  const handleGenerateSummary = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await generateSummary(note.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPreview = (content: string, maxLength: number = 150) => {
    return content.length > maxLength 
      ? content.substring(0, maxLength) + '...' 
      : content;
  };

  return (
    <Link to={`/note/${note.id}`}>
      <div className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 dark:hover:bg-slate-800/90">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {note.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(note.updatedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>{note.content.split(' ').length} words</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className="p-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
              title="Generate AI Summary"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <Link
              to={`/note/${note.id}/edit`}
              className="p-2 text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all duration-200 hover:scale-110"
              title="Edit Note"
            >
              <Edit3 className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
              title="Delete Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          {getPreview(note.content)}
        </p>

        {note.summary && (
          <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                AI Summary
              </span>
            </div>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 leading-relaxed">
              {note.summary}
            </p>
          </div>
        )}

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};