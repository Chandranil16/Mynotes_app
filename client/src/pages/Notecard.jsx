import React, { useState } from 'react'
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi'

const Notecard = ({ note, onedit, deletenote, onView }) => {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deletenote(note._id);
    setIsDeleting(false);
  };

  const truncateText = (text, maxLength = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={e => {
        // Prevent modal opening when clicking actions menu
        if (e.target.closest('.notecard-actions')) return;
        onView && onView(note);
      }}
      tabIndex={0}
      role="button"
      aria-label="View note"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          onView && onView(note);
        }
      }}
    >
      <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/30 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 min-h-[160px] sm:min-h-[200px] flex flex-col">
        
        {/* Header with Actions */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2 flex-1 pr-2 leading-tight break-words">
            {note.title}
          </h3>
          
          {/* Actions Menu */}
          <div className="relative notecard-actions">
            <button
              onClick={e => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-neu-inset hover:shadow-neu-elevated backdrop-blur-sm"
              aria-label="More actions"
            >
              <FiMoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-32 backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border border-white/20 dark:border-slate-700/30 rounded-xl shadow-xl z-10 overflow-hidden animate-scale-in">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onedit(note);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-left text-slate-700 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                >
                  <FiEdit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete();
                    setShowActions(false);
                  }}
                  disabled={isDeleting}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-left text-slate-700 dark:text-slate-300 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-200 disabled:opacity-50"
                >
                  <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium">
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Note Content */}
        <div className="flex-1 mb-2 sm:mb-4 overflow-hidden">
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
            {truncateText(note.desc)}
          </p>
        </div>

        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .shadow-neu-inset {
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8);
        }
        .shadow-neu-elevated {
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  )
}

export default Notecard
