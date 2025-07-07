const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
