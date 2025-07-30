export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface NotesContextType {
  notes: Note[];
  loading: boolean;
  error: string | null;
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  generateSummary: (id: string) => Promise<void>;
  clearError: () => void;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}