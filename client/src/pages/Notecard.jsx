import React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const Notecard = ({ note, onedit, deletenote }) => {
  return (
    <div className="bg-gray-200 rounded-xl shadow-md p-3 sm:p-4 flex flex-col gap-2 border border-gray-500 hover:shadow-lg min-h-[160px] sm:min-h-[180px] hover:bg-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 w-full">
      <h3 className="text-base sm:text-lg font-semibold text-blue-700 truncate" title={note.title}>{note.title}</h3>
      <p className="text-gray-700 flex-1 break-words whitespace-pre-line overflow-hidden text-sm sm:text-base" style={{maxHeight: '80px'}}>{note.desc}</p>
      <div className="flex justify-between items-end mt-2">
        <span className="text-xs text-gray-400">{note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onedit(note)}
            className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => deletenote(note._id)}
            className="text-red-600 hover:text-red-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notecard
