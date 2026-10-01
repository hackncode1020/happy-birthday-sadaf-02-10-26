import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ photo, onClose }) => {
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center bg-[#FFF8FA] rounded-2xl p-4 md:p-6 shadow-2xl border border-pink-200/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute -top-3 -right-3 md:top-4 md:right-4 z-10 p-2 rounded-full bg-white/95 text-pink-900 hover:text-pink-600 shadow-md transition-all hover:scale-105 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-res Image Container */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden rounded-xl bg-pink-50/50">
          <img
            src={photo.src}
            alt={photo.alt}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="font-serif text-xl font-bold text-[#831843]">
            {photo.caption}
          </h3>
          <p className="text-xs text-pink-500/80 mt-1 uppercase tracking-wider">
            Sadaf&apos;s Birthday Gallery
          </p>
        </div>
      </div>
    </div>
  );
};
