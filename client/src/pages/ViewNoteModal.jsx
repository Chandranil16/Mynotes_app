import React from "react";
import { FiX } from "react-icons/fi";

const ViewNoteModal = ({ note, onClose }) => {
  if (!note) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      ></div>
      {/* Modal Container */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-4 sm:p-8 z-10 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>
        <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-800 dark:text-slate-100 break-words">
          {note.title}
        </h2>
        <div
          className="flex-1 overflow-y-auto pr-1 sm:pr-2 text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words text-sm sm:text-base"
          style={{ maxHeight: "60vh" }}
        >
          {note.desc}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .max-w-xs { max-width: 20rem; }
        }
      `}</style>
    </div>
  );
};

export default ViewNoteModal;