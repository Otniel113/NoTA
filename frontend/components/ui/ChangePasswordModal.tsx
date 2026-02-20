"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    setError("");
    setSuccessMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = Array.isArray(data.message) 
          ? data.message.join("\n") 
          : data.message || "Failed to change password";
        throw new Error(errorMessage);
      }

      setSuccessMessage("Password changed successfully");
      setTimeout(() => {
        onClose();
        // Reset fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccessMessage("");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#5c4033]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-md flex flex-col bg-[#FEFAE0] border border-[#D4A373]/20 rounded-xl shadow-[0_20px_50px_-12px_rgba(92,64,51,0.25)] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-2 border-b border-transparent shrink-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#5C4033] text-lg font-bold leading-tight">Change Password</span>
            <span className="text-[#8D7B68] text-xs">
              Secure your account
            </span>
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
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center whitespace-pre-line">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center">
              {successMessage}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#8D7B68] mb-2 ml-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D4A373]/30 bg-white/40 text-[#5C4033] placeholder-[#8D7B68]/40 focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] shadow-sm transition-all outline-none"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#8D7B68] mb-2 ml-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D4A373]/30 bg-white/40 text-[#5C4033] placeholder-[#8D7B68]/40 focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] shadow-sm transition-all outline-none"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#8D7B68] mb-2 ml-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D4A373]/30 bg-white/40 text-[#5C4033] placeholder-[#8D7B68]/40 focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] shadow-sm transition-all outline-none"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-[#D4A373]/5 flex flex-col sm:flex-row sm:items-center justify-end gap-3 bg-white/30 rounded-b-xl shrink-0">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-[#8D7B68] font-bold text-sm hover:bg-[#D4A373]/10 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#D4A373] hover:bg-[#c29363] text-white shadow-lg shadow-[#D4A373]/20 transition-all font-bold text-sm tracking-wide group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span className="material-icons-round text-[20px]">lock_reset</span>
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
