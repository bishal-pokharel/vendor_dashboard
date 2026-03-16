'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const DURATION = 3000;

export default function Toast({ message, show, onClose }: ToastProps) {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (!show) {
      setWidth(100);
      return;
    }

    // close after DURATION
    const closeTimer = setTimeout(() => {
      onClose();
    }, DURATION);

    // shrink bar from 100 to 0 over DURATION
    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - (100 / (DURATION / 100));
      });
    }, 100);

    return () => {
      clearTimeout(closeTimer);
      clearInterval(interval);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-1 z-50 min-w-[300px] max-w-[360px]
                    bg-white border border-gray-200 shadow-lg rounded-xl
                    overflow-hidden
                    animate-in slide-in-from-top-4 fade-in duration-300">

      {/* main content row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={16} className="text-emerald-500" />
        </div>
        <p className="text-sm font-medium text-gray-700 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
        >
          <X size={14} />
        </button>

      </div>

      {/* timer progress bar at the bottom */}
      <div className="h-1 bg-gray-100 w-full">
        <div
          className="h-full bg-emerald-500 transition-all duration-100 ease-linear"
          style={{ width: `${width}%` }}
        />
      </div>

    </div>
  );
}