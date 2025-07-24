import React, { useEffect } from 'react';
import type { ToastType } from '../types';
import { CheckCircleIcon, XCircleIcon } from '../constants';

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    bgClass: 'bg-green-100 border-green-300 text-green-800',
  },
  error: {
    icon: <XCircleIcon className="w-6 h-6 text-red-500" />,
    bgClass: 'bg-red-100 border-red-300 text-red-800',
  },
  info: {
    icon: <CheckCircleIcon className="w-6 h-6 text-blue-500" />,
    bgClass: 'bg-blue-100 border-blue-300 text-blue-800',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, visible, onClose }) => {
  if (!visible) {
    return null;
  }

  const { icon, bgClass } = toastConfig[type];

  return (
    <div
      className={`fixed top-5 right-5 z-[100] w-full max-w-sm p-4 rounded-lg shadow-2xl border flex items-center gap-3 transition-transform duration-300 ease-in-out animate-slide-in-right ${bgClass}`}
    >
      <div className="shrink-0">{icon}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;