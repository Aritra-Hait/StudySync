import express from "express";
import { getNotes, createNote, updateNote, deleteNote, getNoteByID, getNotesBySubject, getSubjects } from "../controllers/notesControllers.js"
import auth from "../middleware/auth.js";
const router = express.Router();


router.get("/subjects", auth, getSubjects);
router.get("/", auth, getNotes);
router.get("/:id", auth, getNoteByID);
router.get("/subject/:subject", auth, getNotesBySubject);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);


export default router;
