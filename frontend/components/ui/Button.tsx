import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "text-white bg-primary hover:bg-[#c08d5f] focus:ring-primary",
    secondary: "text-gray-700 bg-background-light hover:bg-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
