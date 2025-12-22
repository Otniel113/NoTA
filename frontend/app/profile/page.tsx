"use client";

import { useState, useEffect } from "react";
import HomeAuthNavbar from "@/components/layout/HomeAuthNavbar";

interface NoteData {
  note_id: string;
  author: string;
  title: string;
  content: string;
  visibility: string;
  created_at: string;
  edited_at: string | null;
}

interface UserData {
  user_id: string;
  username: string;
}

interface DisplayNote {
  id: string;
  author: string;
  title: string;
  content: React.ReactNode;
  updatedLabel: string;
  timestamp: number;
  bgColor: string;
  visibility: string;
  isOwner: boolean;
}

const BG_COLORS = ["bg-sand-tan", "bg-sage-light", "bg-sage-medium", "bg-sand-light"];

export default function ProfilePage() {
  const [notes, setNotes] = useState<DisplayNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "public" | "members">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const [notesRes, usersRes] = await Promise.all([
          fetch("/note_data.json"),
          fetch("/user_data.json"),
        ]);

        const notesData: NoteData[] = await notesRes.json();
        const usersData: UserData[] = await usersRes.json();

        // Create a map for quick user lookup
        const userMap = new Map(usersData.map((u) => [u.user_id, u.username]));
        const currentUserId = "u1"; // Hardcoded current user

        const processedNotes: DisplayNote[] = notesData
          .filter((note) => note.author === currentUserId) // Only show current user's notes
          .map((note, index) => {
            const date = new Date(note.edited_at || note.created_at);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let updatedLabel = "";
            if (diffDays <= 1) updatedLabel = "Updated today";
            else if (diffDays === 2) updatedLabel = "Updated yesterday";
            else if (diffDays < 7) updatedLabel = `Updated ${diffDays} days ago`;
            else if (diffDays < 30) updatedLabel = `Updated ${Math.floor(diffDays / 7)} weeks ago`;
            else updatedLabel = `Updated ${Math.floor(diffDays / 30)} months ago`;

            // Normalize visibility for frontend (member -> members)
            const visibility = note.visibility === "member" ? "members" : note.visibility;

            return {
              id: note.note_id,
              author: `@${userMap.get(note.author) || "unknown"}`,
              title: note.title,
              content: note.content,
              updatedLabel,
              timestamp: date.getTime(),
              bgColor: BG_COLORS[index % BG_COLORS.length],
              visibility,
              isOwner: true,
            };
          });

        setNotes(processedNotes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNotes = notes.filter((note) => {
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
            Hello, @currentuser
          </h1>
          <p className="text-gray-600 text-lg font-light">
            Here are all the notes you have created.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
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
                  <h3 className="font-display text-xl text-gray-800 mb-2 leading-tight">
                    {note.title}
                  </h3>
                  <div className="note-content flex-grow overflow-hidden fade-bottom mb-4 text-gray-700 text-sm leading-relaxed">
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
          </>
        )}
      </main>
    </>
  );
}
