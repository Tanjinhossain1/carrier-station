// src/components/Snackbar.tsx
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface SnackbarProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  show: boolean;
  duration?: number;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = 'info',
  show,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={cn(
        'fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white',
        {
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
          'bg-blue-500': type === 'info',
        }
      )}
    >
      {message}
    </div>
  );
};

export default Snackbar;
