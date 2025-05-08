const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../utils/token.js');
const { createNote, editNote, getNotes, deleteNote, pinNote, searchNote } = require('../controllers/noteController.js');

// create_note
router.post('/create-note', authenticateToken, createNote);
// edit_note
router.put('/edit-note/:noteId', authenticateToken, editNote)
// get_note
router.get('/get-notes', authenticateToken, getNotes)
// delete_note
router.delete('/delete-note/:noteId', authenticateToken, deleteNote)
// pin_note
router.put('/pin-note/:noteId', authenticateToken, pinNote);
// search_note
router.get('/search/:query', authenticateToken, searchNote);

module.exports = router;