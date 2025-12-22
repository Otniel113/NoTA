"use client";

import { useEffect } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#5c4033]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-[400px] flex flex-col bg-[#FEFAE0] border border-[#D4A373]/20 rounded-xl shadow-[0_20px_50px_-12px_rgba(92,64,51,0.25)] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
            <span className="material-icons-round text-2xl">warning</span>
          </div>
          
          <h3 className="text-[#5C4033] text-2xl font-bold mb-2">Are you sure?</h3>
          <p className="text-[#8D7B68] text-base leading-relaxed">
            This action cannot be undone. This will permanently delete your note.
          </p>
        </div>

        <div className="flex border-t border-[#D4A373]/10 bg-white/30">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-[#5C4033] font-bold text-base hover:bg-[#D4A373]/10 transition-colors"
          >
            No, Cancel
          </button>
          <div className="w-px bg-[#D4A373]/10"></div>
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 text-red-600 font-bold text-base hover:bg-red-50 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
