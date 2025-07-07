const express = require("express");
const Note = require("../models/note");
const middleware = require("../middleware/middleware");
const router = express.Router();

router.post('/add', middleware,async(req,res)=>{
     try {
    const { title, desc } = req.body;
    


    const newNote = new Note({
      title,
      desc,
      userID: req.user._id,
    });

    await newNote.save();

    return res
      .status(201)
      .json({ message: "Note added successfully" , success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding note" });
  }
});


router.get('/', middleware,async(req,res)=>{
  try {
    const notes = await Note.find({userID: req.user._id }); 
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Error fetching notes" });

  }
})

router.put("/:id",async (req,res)=>{
  try {
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      req.body,
    );

    

    res.status(200).json({ success: true, updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Error updating notes" });

  }
})


router.delete("/:id",async (req,res)=>{
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(
      id
    );

    res.status(200).json({ success: true, deletedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Error deleting notes" });

  }
})


module.exports = router;