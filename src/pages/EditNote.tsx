import React from 'react';
import { useParams } from 'react-router-dom';
import { NoteForm } from '../components/NoteForm';
import { useNotes } from '../contexts/NotesContext';

export const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notes } = useNotes();
  
  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Note not found
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          The note you're trying to edit doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <NoteForm note={note} isEditing={true} />
    </div>
  );
};