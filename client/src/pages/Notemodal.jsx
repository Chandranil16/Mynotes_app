import React, { useEffect, useState } from "react";
import { FiX, FiSave, FiEdit3 } from "react-icons/fi";

const Notemodal = ({ handleModalClose, addnote, currentnote, editnote }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentnote) {
      setTitle(currentnote.title);
      setDesc(currentnote.desc);
    } else {
      setTitle("");
      setDesc("");
    }
  }, [currentnote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let success = false;
    if (currentnote) {
      success = await editnote(currentnote._id, title, desc);
    } else {
      success = await addnote(title, desc);
    }

    setIsLoading(false);
    if (success) {
      handleModalClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleModalClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md sm:max-w-lg transform transition-all duration-300 animate-scale-in">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border border-white/20 dark:border-slate-700/30 rounded-3xl shadow-2xl p-4 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-neu-elevated">
                <FiEdit3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {currentnote ? "Edit Note" : "Create Note"}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  {currentnote ? "Update your note" : "Add a new note to your collection"}
                </p>
              </div>
            </div>
            <button
              onClick={handleModalClose}
              className="p-2 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 shadow-neu-inset hover:shadow-neu-elevated backdrop-blur-sm"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Title Input */}
            <div className="group">
              <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Note Title
              </label>
              <input
                type="text"
                placeholder="Enter a descriptive title..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-neu-inset focus:shadow-neu-elevated text-sm sm:text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            {/* Description Textarea */}
            <div className="group">
              <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Note Content
              </label>
              <textarea
                placeholder="Write your note content here..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-neu-inset focus:shadow-neu-elevated resize-none text-sm sm:text-base"
                rows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                maxLength={2000}
              />
            </div>

            {/* Character Count */}
            <div className="flex justify-between items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span>Title: {title.length} / 100</span>
              <span>Content: {desc.length} / 2000</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isLoading || !title.trim() || !desc.trim()}
                className="group relative flex-1 flex items-center justify-center space-x-2 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20 text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{currentnote ? "Updating..." : "Creating..."}</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      <span>{currentnote ? "Update Note" : "Create Note"}</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/50 to-purple-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>

              <button
                type="button"
                onClick={handleModalClose}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-white/70 dark:hover:bg-slate-600/70 transition-all duration-200 shadow-neu-inset hover:shadow-neu-elevated backdrop-blur-sm text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .shadow-neu-inset {
          box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8);
        }
        .shadow-neu-elevated {
          box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Notemodal;
