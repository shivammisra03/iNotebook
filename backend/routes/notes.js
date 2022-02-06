const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route 1 : Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server error occured')
    }

})


//Route 2 : Add a new note using POST '/api/auth/addnote', login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.send(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server error occured')
    }

})


//Route 3 update an existing note : /api/notes/udpatenote Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    const newnote = {}
    if (title) newnote.title = title;
    if (description) newnote.description = description;
    if (tag) newnote.tag = tag;

    //find the note to be updated
    // const note = Notes.findByIdAndUpdate(req.body.user.id)
    let note = await Notes.findById(req.params.id)
    if (!note)
        return res.status(404).send('Not found')
    console.log("User :" + note.user.toString())
    if (note.user.toString() != req.user.id)
        return res.status(401).send('Not Authorized')
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.send(note)
})
module.exports = router