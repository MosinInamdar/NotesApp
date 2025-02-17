// Single Responsibility Principle: This controller is responsible for note-related operations.
// Dependency Inversion Principle: The controller depends on abstractions (Note model) to perform operations.

const Note = require("../models/note.model");

// Single Responsibility Principle: Adds a new note.
exports.addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: "Note Added Successfully",
    });
  } catch (error) {
    console.error("Error in addNote:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Edits an existing note.
exports.editNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes Provided" });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res
        .status(400)
        .json({ error: true, message: "No such notes found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    // Using a strict check to allow boolean false as a valid update.
    if (isPinned !== undefined) note.isPinned = isPinned;
    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    console.error("Error in editNote:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Retrieves all notes for the authenticated user.
exports.getAllNotes = async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.status(200).json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Deletes a specified note.
exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res
        .status(400)
        .json({ error: true, message: "No such notes found" });
    }
    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res
      .status(200)
      .json({ error: false, message: "Note Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Updates the pin status of a note.
exports.updateNotePin = async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;
  const { isPinned } = req.body;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res
        .status(400)
        .json({ error: true, message: "No such notes found" });
    }
    note.isPinned = isPinned;
    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateNotePin:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Searches for notes matching the provided query.
exports.searchNotes = async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;
  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }
  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });
    return res.status(200).json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    console.error("Error in searchNotes:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
