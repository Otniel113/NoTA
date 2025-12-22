"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-sage-light px-6 py-4 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Hamburger Row */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-display text-xl shadow-sm">
              N
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">
              NoTA
            </span>
          </Link>

          {/* Hamburger Button (Mobile Only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-icons-round text-2xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl w-full">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400 text-xl group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-3 rounded-full border-none bg-background-light text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary/50 shadow-inner-light transition-all outline-none"
              placeholder="Search public notes..."
              type="text"
            />
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 w-full md:w-auto justify-end">
          <Link href="/login">
            <button className="bg-background-light hover:bg-white text-gray-700 px-5 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-2 font-medium text-sm cursor-pointer">
              <span className="material-icons-round text-lg">login</span>
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-primary hover:bg-[#c08d5f] text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium text-sm cursor-pointer">
              <span className="material-icons-round text-lg">person_add</span>
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Menu (Collapsible) */}
        {isMenuOpen && (
          <div className="w-full md:hidden flex flex-col gap-3 pt-2 animate-in slide-in-from-top-2 duration-200">
            <Link href="/login" className="w-full">
              <button className="w-full bg-background-light hover:bg-white text-gray-700 px-5 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 font-medium text-sm cursor-pointer">
                <span className="material-icons-round text-lg">login</span>
                Login
              </button>
            </Link>
            <Link href="/register" className="w-full">
              <button className="w-full bg-primary hover:bg-[#c08d5f] text-white px-5 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-medium text-sm cursor-pointer">
                <span className="material-icons-round text-lg">person_add</span>
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
