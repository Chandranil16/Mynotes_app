import React, { useEffect, useState } from "react";
const Notemodal = ({handleModalClose, addnote, currentnote, editnote}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  
  useEffect(()=>{
    if (currentnote) {
      setTitle(currentnote.title);
      setDesc(currentnote.desc);
    }
  },[currentnote])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (currentnote) {
      success = await editnote(currentnote._id, title, desc);
    } else {
      success = await addnote(title, desc);
    }
    if (success) {
      handleModalClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent px-2">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md relative">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">{currentnote ? "Edit Note" : "Add New Note"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Note Title"
            className="border rounded-lg px-3 py-2 text-sm sm:text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Note Description"
            className="border rounded-lg px-3 py-2 min-h-[80px] text-sm sm:text-base"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm sm:text-base"
            >
              {currentnote ? "Update Note" : "Add Note"}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm sm:text-base"
              onClick={handleModalClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notemodal;
