import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Tag } from 'lucide-react';
import { Note } from '../types';
import { useNotes } from '../contexts/NotesContext';
import { LoadingSpinner } from './LoadingSpinner';

interface NoteFormProps {
  note?: Note;
  isEditing?: boolean;
}

export const NoteForm: React.FC<NoteFormProps> = ({ note, isEditing = false }) => {
  const navigate = useNavigate();
  const { createNote, updateNote, loading } = useNotes();
  
  const [formData, setFormData] = useState({
    title: note?.title || '',
    content: note?.content || '',
    tags: note?.tags?.join(', ') || ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = formData.content.length;
    setWordCount(formData.content.trim() ? words : 0);
    setCharCount(chars);
  }, [formData.content]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setIsSaving(true);

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const noteData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: tags.length > 0 ? tags : undefined
      };

      if (isEditing && note) {
        await updateNote(note.id, noteData);
        navigate(`/note/${note.id}`);
      } else {
        await createNote(noteData);
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isEditing && note) {
      navigate(`/note/${note.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-xl shadow-indigo-500/5 dark:shadow-indigo-400/5 overflow-hidden">
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {isEditing ? 'Edit Note' : 'Create New Note'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {isEditing ? 'Update your note with new information' : 'Capture your thoughts and ideas'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title..."
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label 
                htmlFor="content" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Content
              </label>
              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your note content here..."
              rows={12}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 resize-none"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="tags" 
              className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              <Tag className="w-4 h-4" />
              <span>Tags (optional)</span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags separated by commas (e.g., work, ideas, important)"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            
            <button
              type="submit"
              disabled={loading || isSaving || !formData.title.trim() || !formData.content.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg transition-all duration-200 font-medium disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {(loading || isSaving) ? (
                <LoadingSpinner size="sm" className="text-white" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>
                {(loading || isSaving) ? 'Saving...' : (isEditing ? 'Update Note' : 'Create Note')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};