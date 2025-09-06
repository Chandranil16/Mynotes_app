import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";
import Notemodal from "../pages/Notemodal";
import Notecard from "../pages/Notecard";
import ViewNoteModal from "../pages/ViewNoteModal";
import { useAuth } from "../Context/Contextprovider";
import { toast } from "react-toastify";

const CARDS_PER_PAGE = 8;

const Home = () => {
  const { user } = useAuth();
  const [ismodalopen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filterednotes, setfilterednotes] = useState([]);
  const [currentnote, setcurrentnote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewNote, setViewNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setfilterednotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, notes]);

  useEffect(() => {
    if (user && user._id) {
      fetchnotes();
    }
  }, [user]);

  const fetchnotes = async () => {
    try {
      const { data } = await axios.get("https://mynotes-app-backend.onrender.com/api/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const onedit = (note) => {
    setcurrentnote(note);
    setIsModalOpen(true);
  };

  const addnote = async (title, desc) => {
    try {
      const res = await axios.post(
        "https://mynotes-app-backend.onrender.com/api/notes/add",
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        fetchnotes();
        toast.success("Note added successfully");
        return true;
      }
      return false;
    } catch (error) {
      if (error.response && error.response.data.message === "jwt expired") {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.log("Error adding note:", error.response?.data || error.message);
      }
    }
  };

  const deletenote = async (id) => {
    try {
      const res = await axios.delete(`https://mynotes-app-backend.onrender.com/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        fetchnotes();
        toast.success("Note deleted successfully");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const editnote = async (id, title, desc) => {
    try {
      const res = await axios.put(
        `https://mynotes-app-backend.onrender.com/api/notes/${id}`,
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        fetchnotes();
        toast.success("Note updated successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filterednotes.length / CARDS_PER_PAGE);
  const paginatedNotes = filterednotes.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filterednotes, totalPages, currentPage]);

  // Responsive: If not authenticated, show prompt
  if (!user || !user._id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
        <Navbar setSearchQuery={() => {}} />
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center backdrop-blur-xl border border-white/20 dark:border-slate-700/30">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              Please Sign In
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              You must be logged in to view, create, or manage your notes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navbar setSearchQuery={setSearchQuery} />

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2 sm:mb-4 animate-fade-in">
            Your Notes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-delay">
            Organize your thoughts with our beautiful, modern note-taking experience
          </p>
        </div>

        {/* Responsive Notes Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 animate-fade-in-up">
          {paginatedNotes && paginatedNotes.length > 0 ? (
            paginatedNotes.map((note, index) => (
              <div
                key={note._id}
                className="transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Notecard
                  note={note}
                  onedit={onedit}
                  deletenote={deletenote}
                  onView={setViewNote}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mb-6 shadow-neu-inset">
                <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No notes yet</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                Start organizing your thoughts by creating your first note
              </p>
              <button
                onClick={() => {
                  setcurrentnote(null);
                  setIsModalOpen(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Create Your First Note
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 select-none">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setcurrentnote(null);
          setIsModalOpen(true);
        }}
        className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-neu-elevated hover:shadow-neu-elevated-hover transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 backdrop-blur-sm border border-white/20"
        aria-label="Add Note"
      >
        <svg 
          className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/50 to-blue-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </button>

      {/* Modal */}
      {ismodalopen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <Notemodal
            handleModalClose={handleModalClose}
            addnote={addnote}
            currentnote={currentnote}
            editnote={editnote}
            deletenote={deletenote}
          />
        </div>
      )}

      {/* View Note Modal */}
      {viewNote && (
        <ViewNoteModal note={viewNote} onClose={() => setViewNote(null)} />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.4s both;
        }
        .shadow-neu-inset {
          box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8);
        }
        .shadow-neu-elevated {
          box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.7);
        }
        .shadow-neu-elevated-hover {
          box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.2), -12px -12px 24px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};

export default Home;
