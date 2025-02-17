// Interface Segregation Principle: This file provides a dedicated interface for note-related operations.
// Single Responsibility Principle: This module is responsible solely for defining note routes.

const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const { authenticateToken } = require("../utilities");

// Single Responsibility Principle: Route for adding a new note.
router.post("/add-note", authenticateToken, noteController.addNote);

// Single Responsibility Principle: Route for editing an existing note.
router.put("/edit-note/:noteId", authenticateToken, noteController.editNote);

// Single Responsibility Principle: Route for retrieving all notes.
router.get("/get-all-notes", authenticateToken, noteController.getAllNotes);

// Single Responsibility Principle: Route for deleting a note.
router.delete(
  "/delete-note/:noteId",
  authenticateToken,
  noteController.deleteNote
);

// Single Responsibility Principle: Route for updating a note's pin status.
router.put(
  "/update-note-pin/:noteId",
  authenticateToken,
  noteController.updateNotePin
);

// Single Responsibility Principle: Route for searching notes.
router.get("/search-notes", authenticateToken, noteController.searchNotes);

module.exports = router;
