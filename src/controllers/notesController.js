const Note = require('../models/Note');

// Get all notes (admin) or user's notes (user)
const getNotes = async (req, res) => {
  try {
    const { user } = req;
    let query;

    if (user.role === 'admin') {
      query = Note.find().sort({ createdAt: -1 });
    } else {
      query = Note.find({ userId: user.id }).sort({ createdAt: -1 });
    }

    const notes = await query.exec();
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single note
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check permissions
    if (user.role !== 'admin' && note.userId.toString() !== user.id && !note.isPublic) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    res.json(note);
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create note
const createNote = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;
    const { user } = req;

    const note = new Note({
      userId: user.id,
      title,
      content,
      isPublic: isPublic || false,
    });

    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPublic } = req.body;
    const { user } = req;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check permissions
    if (user.role !== 'admin' && note.userId.toString() !== user.id) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (isPublic !== undefined) note.isPublic = isPublic;
    note.updatedAt = new Date();

    await note.save();

    res.json({
      message: 'Note updated successfully',
      note,
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check permissions
    if (user.role !== 'admin' && note.userId.toString() !== user.id) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    await Note.deleteOne({ _id: id });

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
