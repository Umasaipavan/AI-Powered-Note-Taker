import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <p className="text-red-700 dark:text-red-400 text-sm font-medium">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};