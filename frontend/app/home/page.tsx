"use client";

import { useState } from "react";
import HomeAuthNavbar from "@/components/layout/HomeAuthNavbar";

const homeAuthNotes = [
  {
    id: 101,
    author: "@currentuser",
    title: "Weekly Groceries",
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li>Almond Milk</li>
        <li>Eggs (Free range)</li>
        <li>Spinach</li>
        <li>Avocados</li>
        <li className="opacity-50 line-through decoration-1">
          Whole grain bread
        </li>
        <li>Greek Yogurt</li>
      </ul>
    ),
    updatedLabel: "Updated yesterday",
    timestamp: new Date().setDate(new Date().getDate() - 1),
    bgColor: "bg-sage-light",
    visibility: "members",
    isOwner: true,
  },
  {
    id: 1,
    author: "@creative_soul",
    title: "Art Supplies Wishlist",
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li>Winsor & Newton Watercolor Set</li>
        <li>Arches Cold Press Paper Block</li>
        <li>Sable Hair Brushes (Size 4, 8)</li>
        <li>Masking Fluid</li>
        <li>Ceramic Palette</li>
      </ul>
    ),
    updatedLabel: "Updated yesterday",
    timestamp: new Date().setDate(new Date().getDate() - 1),
    bgColor: "bg-sage-light",
    visibility: "public",
    isOwner: false,
  },
  {
    id: 6,
    author: "@writer_j",
    title: "Inspiration Quote",
    content: (
      <>
        <p>
          &quot;Start writing, no matter what. The water does not flow until the
          faucet is turned on.&quot;
        </p>
        <p className="mt-2">- Louis L&apos;Amour</p>
      </>
    ),
    updatedLabel: "Updated 2 days ago",
    timestamp: new Date().setDate(new Date().getDate() - 2),
    bgColor: "bg-sand-tan",
    visibility: "members",
    isOwner: false,
  },
  {
    id: 2,
    author: "@sarah_m",
    title: "Public Announcement: Q3",
    content: (
      <>
        <p className="mb-2">
          <strong>To all stakeholders:</strong>
        </p>
        <p>
          We are pleased to announce that our community outreach program has
          expanded to 3 new districts. Volunteers are welcome to join our
          Saturday meetups at the central park.
        </p>
      </>
    ),
    updatedLabel: "Updated 1 week ago",
    timestamp: new Date().setDate(new Date().getDate() - 7),
    bgColor: "bg-sage-medium",
    visibility: "public",
    isOwner: false,
  },
  {
    id: 102,
    author: "@currentuser",
    title: "Project Ideas 2025",
    content: (
      <p>
        1. AI-powered plant watering system
        <br />
        2. Community book exchange app
        <br />
        3. Personal finance tracker with gamification
      </p>
    ),
    updatedLabel: "Updated 3 days ago",
    timestamp: new Date().setDate(new Date().getDate() - 3),
    bgColor: "bg-sand-light",
    visibility: "members",
    isOwner: true,
  },
];

export default function HomeAuthPage() {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "public" | "members">("all");

  const filteredNotes = homeAuthNotes.filter((note) => {
    if (filter === "all") return true;
    return note.visibility === filter;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) =>
    sortOrder === "newest"
      ? b.timestamp - a.timestamp
      : a.timestamp - b.timestamp
  );

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return "public";
      case "members":
        return "group";
      default:
        return "public";
    }
  };

  return (
    <>
      <HomeAuthNavbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10 text-center">
          <h1 className="font-display text-5xl text-gray-900 mb-3">
            All Notes
          </h1>
          <p className="text-gray-600 text-lg font-light">
            A space for your thoughts, ideas, and reflections from NoTA.
          </p>
          <p className="text-gray-600 text-lg font-light">
            You can now see all notes for public and members only.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          {/* Filter Buttons */}
          <div className="bg-sage-light p-1.5 rounded-full flex items-center shadow-inner-light overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                filter === "all"
                  ? "bg-background-light text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Notes
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                filter === "public"
                  ? "bg-background-light text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setFilter("members")}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                filter === "members"
                  ? "bg-background-light text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Members Only
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white px-5 py-2.5 rounded-full text-gray-700 shadow-sm border border-gray-100 flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer"
            >
              <span className="material-icons-round text-gray-400 text-lg">
                sort
              </span>
              <span>
                Sort by:{" "}
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </span>
              <span
                className={`material-icons-round text-lg transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-20 border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Sort Order
                  </div>
                  <button
                    onClick={() => {
                      setSortOrder("newest");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-sage-light/30 transition-colors ${
                      sortOrder === "newest"
                        ? "text-primary font-semibold bg-sage-light/20"
                        : "text-gray-700"
                    }`}
                  >
                    Newest
                    {sortOrder === "newest" && (
                      <span className="material-icons-round text-sm">
                        check
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder("oldest");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-sage-light/30 transition-colors ${
                      sortOrder === "oldest"
                        ? "text-primary font-semibold bg-sage-light/20"
                        : "text-gray-700"
                    }`}
                  >
                    Oldest
                    {sortOrder === "oldest" && (
                      <span className="material-icons-round text-sm">
                        check
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedNotes.map((note) => (
            <article
              key={note.id}
              className={`group relative ${note.bgColor} p-6 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 flex flex-col h-80`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg text-gray-800">
                  {note.author}
                </span>
                {note.isOwner && (
                  <div className="flex gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/40 hover:bg-white/70 text-gray-700 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <span className="material-icons-round text-lg">edit</span>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/40 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <span className="material-icons-round text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <h3 className="font-display text-xl text-gray-800 truncate mb-2">
                {note.title}
              </h3>
              <div className="note-content flex-grow overflow-y-auto fade-bottom mb-4 text-gray-700 text-sm leading-relaxed">
                {note.content}
              </div>
              <div className="mt-auto flex justify-between items-center border-t border-black/5 pt-4">
                <span className="text-xs text-gray-500">
                  {note.updatedLabel}
                </span>
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  title={
                    note.visibility.charAt(0).toUpperCase() +
                    note.visibility.slice(1)
                  }
                >
                  <span className="material-icons-round text-gray-600 text-sm">
                    {getVisibilityIcon(note.visibility)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#c08d5f] transition-all z-50 cursor-pointer"
        aria-label="Add note"
      >
        <span className="material-icons-round text-3xl">add</span>
      </button>
    </>
  );
}
