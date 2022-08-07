const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewhere/fetchUSer');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE: 1 get loged in use deteals using: POST://api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({user: req.user.id})
    res.json(notes)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
    
})


// ROUTE: 2 upload notes: POST://api/notes/addnotes
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atlist 5 charctors').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

  }
  try {
    const { user, title, description, tag } = req.body;
    const note = new Note({
        user, title, description, tag, user: req.user.id
    })
    const savedNotes = await note.save();
    console.log("note saved")
    res.json(savedNotes)
      
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
    
})



// ROUTE: 3 update notes: put://api/notes/updatenotes/:id
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })



// ROUTE: 4 delete notes: delete://api/notes/deletenote/:ID
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
  
  // Find the note to be updated and update it

  
    //it giving error when we provide unvalid mongodb id dk why?
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
  
  
  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"success": "note has been deleted"});
  
  console.log(`note deleted by    user: ${note.user} 
                note id: ${req.params.id} `)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  })

module.exports = router