import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export default function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">
              {icon}
            </span>
          </div>
        )}
        <input
          className={`block w-full ${
            icon ? "pl-11" : "pl-4"
          } pr-4 py-3 rounded-xl border-none bg-background-light text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary/50 shadow-inner-light transition-all outline-none ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
