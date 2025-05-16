// uploadNotes.js
import { NoteModel } from '../Models/User.js';  // Import the Note model

// ================ UPLOAD NOTE ================
export const uploadNote = async (req, res) => {
  try {
    const { title, teacher, subject } = req.body;
    const note = new NoteModel({
      title,
      teacher,
      subject,
      filename: req.file.filename
    });
    await note.save();
    res.status(201).json({ message: 'Note uploaded successfully', note });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload note' });
  }
};

// =================== DELETE NOTE ===================
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    await NoteModel.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};


//=================== GET ALL NOTES ===================
export const getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find().sort({ uploadedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};


