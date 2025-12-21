"use client";

import { useState } from "react";

const initialNotes = [
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
  },
  {
    id: 3,
    author: "@dev_mike",
    title: "Open Source snippet",
    content: (
      <div className="bg-white/30 p-3 rounded-lg font-mono text-xs text-gray-800">
        <pre>
          {`// Public utility function
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US')
    .format(new Date(date));
}`}
        </pre>
      </div>
    ),
    updatedLabel: "Updated 2 weeks ago",
    timestamp: new Date().setDate(new Date().getDate() - 14),
    bgColor: "bg-sand-light",
    isCode: true,
  },
  {
    id: 4,
    author: "@green_thumb",
    title: "Community Garden Rules",
    content: (
      <>
        <p>- Please close the gate behind you.</p>
        <p>- Water only your assigned plot.</p>
        <p>- Compost bins are for organic waste only.</p>
        <p>- Tools must be cleaned and returned to the shed.</p>
        <p>- Enjoy the flowers!</p>
      </>
    ),
    updatedLabel: "Updated 3 weeks ago",
    timestamp: new Date().setDate(new Date().getDate() - 21),
    bgColor: "bg-sand-light",
  },
  {
    id: 5,
    author: "@reader_one",
    title: "Recommended Reading",
    content: (
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className="material-icons-round text-base opacity-50">
            star
          </span>
          The Pragmatic Programmer
        </li>
        <li className="flex items-center gap-2">
          <span className="material-icons-round text-base opacity-50">
            star
          </span>
          Clean Code
        </li>
        <li className="flex items-center gap-2">
          <span className="material-icons-round text-base opacity-50">
            star
          </span>
          Refactoring UI
        </li>
        <li className="flex items-center gap-2">
          <span className="material-icons-round text-base opacity-50">
            star
          </span>
          Design of Everyday Things
        </li>
      </ul>
    ),
    updatedLabel: "Updated 1 month ago",
    timestamp: new Date().setDate(new Date().getDate() - 30),
    bgColor: "bg-sage-medium",
  },
];

export default function Home() {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortedNotes = [...initialNotes].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-10">
      <header className="mb-10 text-center">
        <h1 className="font-display text-5xl text-gray-900 mb-3">
          Public Notes
        </h1>
        <p className="text-gray-600 text-lg font-light">
          Explore thoughts, ideas, and reflections shared by the community.
        </p>
        <p className="text-gray-600 text-lg font-light">
          With NoTA (No Thought Abandonment).
        </p>
      </header>
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-10">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white px-5 py-2.5 rounded-full text-gray-700 shadow-sm border border-gray-100 flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer"
          >
            <span className="material-icons-round text-gray-400 text-lg">
              sort
            </span>
            <span>
              Sort by: {sortOrder === "newest" ? "Newest" : "Oldest"}
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
              {/* Backdrop to close dropdown when clicking outside */}
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
                    <span className="material-icons-round text-sm">check</span>
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
                    <span className="material-icons-round text-sm">check</span>
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
            </div>
            <h3 className="font-display text-xl text-gray-800 truncate mb-2">
              {note.title}
            </h3>
            <div
              className={`note-content flex-grow overflow-hidden fade-bottom mb-4 ${
                note.isCode ? "" : "text-gray-700 text-sm leading-relaxed"
              }`}
            >
              {note.content}
            </div>
            <div className="mt-auto flex justify-between items-center border-t border-black/5 pt-4">
              <span className="text-xs text-gray-500">{note.updatedLabel}</span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center`}
                title="Public"
              >
                <span className="material-icons-round text-gray-600 text-sm">
                  language
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
