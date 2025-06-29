import Note from "../models/Note.js"

export async function getNotes(req, res) {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 }); //newest first default is 1 which gives oldest first
        res.status(200).json(notes);
    } catch (err) {
        console.error("Error in getNotes controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getNoteByID(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (err) {
        console.error("Error in getNoteByID controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNotesBySubject(req, res) {
    try {
        const { subject } = req.params;
        const notes = await Note.find({ subject, userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
}

export async function getSubjects(req, res) {
    try {
        const subjects = await Note.distinct("subject", { userId: req.user.id });
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch subjects" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content, image, subject } = req.body;
        const newNote = new Note({ title, content, image, subject, userId: req.user.id });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        console.error("Error in createNote controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function updateNote(req, res) {
    try {
        const { title, content, image, subject } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content, image, subject },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (err) {
        console.error("Error in updateNote controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!deletedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        console.error("Error in deleteNote controller", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
