"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export interface Note {
  id: string;
  author: string;
  title: string;
  content: React.ReactNode;
  updatedLabel: string;
  createdAt: string;
  editedAt: string | null;
  timestamp: number;
  bgColor: string;
  visibility: string;
  isOwner?: boolean;
}

interface NoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

export default function NoteDetailModal({ isOpen, onClose, note, onEdit, onDelete }: NoteDetailModalProps) {
  const { isAuthenticated } = useAuth();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !note) return null;

  const isOwnNote = note.isOwner || false;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#5c4033]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-[680px] flex flex-col bg-[#FEFAE0] border border-[#D4A373]/20 rounded-2xl shadow-[0_20px_50px_-12px_rgba(92,64,51,0.25)] max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-4 border-b border-transparent shrink-0">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link 
                  href={`/profile/${note.author.startsWith('@') ? note.author.substring(1) : note.author}`}
                  className="text-[#5C4033] font-bold text-xl leading-none hover:underline cursor-pointer"
                >
                  {note.author}
                </Link>
              ) : (
                <span className="text-[#5C4033] font-bold text-xl leading-none">
                  {note.author}
                </span>
              )}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#E9EDC9]/50 border border-[#CCD5AE]/20">
                <span className="material-icons-round text-[#8D7B68] text-[14px]">
                  {note.visibility === 'members' ? 'group' : 'public'}
                </span>
                <span className="text-[#8D7B68] text-[10px] font-bold uppercase tracking-wide">
                  {note.visibility === 'members' ? 'Members Only' : 'Public'}
                </span>
              </div>
            </div>
            <span className="text-[#8D7B68] text-sm">{note.updatedLabel}</span>
            <div className="flex flex-col gap-0.5 mt-1">
              <span className="text-[#8D7B68] text-xs">Created: {note.createdAt}</span>
              {note.editedAt && note.editedAt !== note.createdAt && (
                <span className="text-[#8D7B68] text-xs">Edited: {note.editedAt}</span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal" 
            className="flex-shrink-0 -mr-2 -mt-2 p-2 text-[#8D7B68] hover:text-[#5C4033] hover:bg-[#D4A373]/10 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-icons-round text-2xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-2">
          <h2 className="text-[#5C4033] text-[28px] sm:text-[32px] font-bold leading-tight mb-4">
            {note.title}
          </h2>
          
          <div className="prose prose-p:text-[#5C4033]/90 prose-headings:text-[#5C4033] max-w-none pb-4">
            <p className="text-base sm:text-lg font-normal leading-relaxed whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
        </div>

        {/* Footer (Only for Own Note) */}
        {isOwnNote && (
          <div className="p-6 pt-4 border-t border-[#D4A373]/5 flex flex-col sm:flex-row sm:items-center justify-end gap-3 bg-white/30 rounded-b-xl">
            <button 
                onClick={() => onEdit && onEdit(note)}
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 h-10 px-6 rounded-lg bg-[#D4A373] hover:bg-[#c29363] text-white shadow-lg shadow-[#D4A373]/20 transition-all font-bold text-sm tracking-wide group cursor-pointer"
            >
              <span className="material-icons-round text-[20px] group-hover:scale-110 transition-transform">edit</span>
              Edit
            </button>
            <button 
                onClick={() => onDelete && onDelete(note)}
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 h-10 px-4 rounded-lg text-red-700 hover:bg-red-50 hover:text-red-800 border border-transparent hover:border-red-200 transition-all font-semibold text-sm group cursor-pointer"
            >
              <span className="material-icons-round text-[20px] group-hover:scale-110 transition-transform">delete</span>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
