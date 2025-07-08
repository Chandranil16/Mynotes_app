import Navbar from "../pages/Navbar";
import Notemodal from "../pages/Notemodal";
import { useState, useEffect } from "react";
import axios from "axios";
import Notecard from "../pages/Notecard";
import { useAuth } from "../Context/Contextprovider";
import { toast } from "react-toastify"; // Import toast for notifications
const Home = () => {
  const { user } = useAuth();
  const [ismodalopen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); // State to hold notes
  const [filterednotes, setfilterednotes] = useState([]); // State to hold filtered notes
  const [currentnote, setcurrentnote] = useState(null); // State to hold the current note being edited
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
      console.log("Fetched notes:", data.notes); 
      setNotes(data.notes); 
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
        return true; // Note added successfully
      }
      return false; // Backend responded but not successful
    } catch (error) {
      if (error.response && error.response.data.message === "jwt expired") {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login
      } else {
        console.log(
          "Error adding note:",
          error.response?.data || error.message
        );
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
      return false; // Error occurred
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
      return false; // Backend responded but not successful
    } catch (error) {
      console.log(error);
      return false; // Error occurred
    }
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <Navbar setSearchQuery={setSearchQuery} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filterednotes && filterednotes.length > 0 ? (
            filterednotes.map((note) => (
              <Notecard
                key={note._id}
                note={note}
                onedit={onedit}
                deletenote={deletenote}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700">No notes found</p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          setcurrentnote(null);
          setIsModalOpen(true);
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition shadow-lg text-sm sm:text-base"
        style={{zIndex: 60}}
        aria-label="Add Note"
      >
        Add Note
      </button>

      {ismodalopen && (
        <Notemodal
          handleModalClose={handleModalClose}
          addnote={addnote}
          currentnote={currentnote}
          editnote={editnote}
          deletenote={deletenote}
        />
      )}
    </div>
  );
};

export default Home;
