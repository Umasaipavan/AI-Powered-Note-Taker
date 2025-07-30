import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Note, NotesContextType } from '../types';
import { localStorage } from '../utils/localStorage';
import { generateSummary } from '../services/openaiApi';

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

type NotesAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: { id: string; note: Partial<Note> } }
  | { type: 'DELETE_NOTE'; payload: string };

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_NOTES':
      return { ...state, notes: action.payload, loading: false };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? { ...note, ...action.payload.note, updatedAt: new Date().toISOString() }
            : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    default:
      return state;
  }
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  useEffect(() => {
    const savedNotes = localStorage.getNotes();
    dispatch({ type: 'SET_NOTES', payload: savedNotes });
  }, []);

  useEffect(() => {
    localStorage.saveNotes(state.notes);
  }, [state.notes]);

  const createNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const newNote: Note = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      dispatch({ type: 'ADD_NOTE', payload: newNote });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create note' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateNote = async (id: string, noteData: Partial<Note>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      dispatch({ type: 'UPDATE_NOTE', payload: { id, note: noteData } });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update note' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      dispatch({ type: 'DELETE_NOTE', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete note' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const generateNoteSummary = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const note = state.notes.find(n => n.id === id);
      if (!note) throw new Error('Note not found');

      const summary = await generateSummary(note.content);
      dispatch({ type: 'UPDATE_NOTE', payload: { id, note: { summary } } });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to generate summary' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: NotesContextType = {
    notes: state.notes,
    loading: state.loading,
    error: state.error,
    createNote,
    updateNote,
    deleteNote,
    generateSummary: generateNoteSummary,
    clearError,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};