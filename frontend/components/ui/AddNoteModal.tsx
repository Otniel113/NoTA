"use client";

import { useState, useEffect } from "react";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNoteModal({ isOpen, onClose }: AddNoteModalProps) {
  const [visibility, setVisibility] = useState<"members" | "public">("members");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#5c4033]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-[650px] flex flex-col bg-[#FEFAE0] border border-[#D4A373]/20 rounded-xl shadow-[0_20px_50px_-12px_rgba(92,64,51,0.25)] max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-2 border-b border-transparent shrink-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#5C4033] text-lg font-bold leading-tight">@currentuser</span>
            <span className="text-[#8D7B68] text-xs">New Note • Draft</span>
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
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="mt-4 mb-6">
            <label className="block text-xs font-bold uppercase tracking-wide text-[#8D7B68] mb-2 ml-1">Visibility</label>
            <div className="flex items-center gap-3">
              {/* Members Option (Replaces Private) */}
              <label className="cursor-pointer group relative">
                <input 
                  type="radio" 
                  name="visibility" 
                  value="members" 
                  checked={visibility === "members"}
                  onChange={() => setVisibility("members")}
                  className="peer sr-only" 
                />
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4A373]/30 bg-white/40 text-[#8D7B68] peer-checked:bg-[#D4A373] peer-checked:text-white peer-checked:border-[#D4A373] peer-checked:shadow-md transition-all">
                  <span className="material-icons-round text-[18px]">group</span>
                  <span className="text-sm font-bold tracking-wide">Members</span>
                </div>
              </label>

              {/* Public Option */}
              <label className="cursor-pointer group relative">
                <input 
                  type="radio" 
                  name="visibility" 
                  value="public" 
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                  className="peer sr-only" 
                />
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4A373]/10 bg-transparent text-[#8D7B68] peer-checked:bg-[#D4A373] peer-checked:text-white peer-checked:border-[#D4A373] peer-checked:shadow-md transition-all">
                  <span className="material-icons-round text-[18px]">public</span>
                  <span className="text-sm font-bold tracking-wide">Public</span>
                </div>
              </label>
            </div>
          </div>

          <div className="group mb-4">
            <label htmlFor="note-title" className="sr-only">Title</label>
            <input 
              id="note-title" 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..." 
              className="w-full bg-transparent border-0 border-b-2 border-transparent hover:border-[#D4A373]/20 focus:border-[#D4A373] focus:ring-0 px-0 py-2 text-[28px] sm:text-[32px] font-bold text-[#5C4033] placeholder-[#8D7B68]/40 transition-colors outline-none"
            />
          </div>

          <div className="pb-4">
            <label htmlFor="note-content" className="sr-only">Note Content</label>
            <textarea 
              id="note-content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your note details here..."
              className="w-full min-h-[200px] sm:min-h-[300px] bg-transparent border-0 p-0 text-base sm:text-lg text-[#5C4033]/90 placeholder-[#8D7B68]/40 focus:ring-0 resize-none leading-relaxed outline-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-[#D4A373]/5 flex flex-col sm:flex-row sm:items-center justify-end gap-3 bg-white/30 rounded-b-xl shrink-0">
          <button 
            onClick={onClose}
            className="flex flex-1 sm:flex-none items-center justify-center h-12 sm:h-10 px-6 rounded-lg text-[#5C4033] hover:bg-[#D4A373]/10 border border-transparent transition-all font-semibold text-base sm:text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
                // Handle Post logic here
                console.log({ title, content, visibility });
                onClose();
            }}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2 h-12 sm:h-10 px-6 rounded-lg bg-[#D4A373] hover:bg-[#c29363] text-white shadow-lg shadow-[#D4A373]/20 transition-all font-bold text-base sm:text-sm tracking-wide group cursor-pointer"
          >
            <span className="material-icons-round text-[20px]">send</span>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
