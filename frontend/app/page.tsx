"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import NoteDetailModal, { Note } from "@/components/ui/NoteDetailModal";
import { useAuth } from "@/context/AuthContext";

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

// Use the Note interface from the modal component for consistency
type DisplayNote = Note;

const BG_COLORS = ["bg-sand-tan", "bg-sage-light", "bg-sage-medium", "bg-sand-light"];

export default function Home() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<DisplayNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<DisplayNote | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchData = async (query = searchQuery) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const url = new URL(`${API_URL}/notes`);
      if (query) {
        url.searchParams.append("search", query);
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const notesData = await response.json();

      const processedNotes: DisplayNote[] = notesData
        .map((note: any, index: number) => {
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

            const formatDate = (dateStr: string) => {
              return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
            };

            return {
              id: note._id,
              author: `@${note.author?.username || "unknown"}`,
              title: note.title,
              content: note.content,
              updatedLabel,
              createdAt: formatDate(note.created_at),
              editedAt: note.edited_at ? formatDate(note.edited_at) : null,
              timestamp: date.getTime(),
              bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
              visibility: note.visibility,
              isOwner: false,
            };
          });

      setNotes(processedNotes);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, searchQuery]);

  const sortedNotes = [...notes].sort((a, b) =>
    sortOrder === "newest"
      ? b.timestamp - a.timestamp
      : a.timestamp - b.timestamp
  );

  const totalPages = Math.ceil(sortedNotes.length / itemsPerPage);
  const paginatedNotes = sortedNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
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
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
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
            {paginatedNotes.map((note) => (
              <article
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`group relative ${note.bgColor} p-6 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 flex flex-col h-80 cursor-pointer`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg text-gray-800">
                    {note.author}
                  </span>
                </div>
                <h3 className="font-display text-xl text-gray-800 mb-2 leading-tight">
                  {note.title}
                </h3>
                <div className="note-content flex-grow overflow-hidden fade-bottom mb-4 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </div>
                <div className="mt-auto flex justify-between items-center border-t border-black/5 pt-4">
                  <span className="text-xs text-gray-500">{note.updatedLabel}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center`}
                    title="Public"
                  >
                    <span className="material-icons-round text-gray-600 text-sm">
                      public
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
              <div className="mt-16 mb-8 flex justify-center items-center gap-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span className="material-icons-round text-3xl">chevron_left</span>
                </button>

                <div className="flex flex-col items-center min-w-[120px]">
                  <span className="text-lg font-semibold text-gray-800 tracking-tight">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span className="material-icons-round text-3xl">chevron_right</span>
                </button>
              </div>
            )}
        </>
      )}
      
      <NoteDetailModal 
        isOpen={!!selectedNote} 
        onClose={() => setSelectedNote(null)} 
        note={selectedNote} 
      />
    </main>
    </>
  );
}
