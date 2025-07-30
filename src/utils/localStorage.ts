import { Note } from '../types';

const NOTES_KEY = 'ai-notes';
const THEME_KEY = 'ai-notes-theme';

export const localStorage = {
  getNotes: (): Note[] => {
    try {
      const notes = window.localStorage.getItem(NOTES_KEY);
      return notes ? JSON.parse(notes) : [];
    } catch {
      return [];
    }
  },

  saveNotes: (notes: Note[]): void => {
    try {
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  },

  getTheme: (): boolean => {
    try {
      const theme = window.localStorage.getItem(THEME_KEY);
      return theme ? JSON.parse(theme) : false;
    } catch {
      return false;
    }
  },

  saveTheme: (isDark: boolean): void => {
    try {
      window.localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }
};