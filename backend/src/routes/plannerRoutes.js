import express from "express";
import { createEvent, getEvents, deleteEvent } from "../controllers/plannerController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/addTask", auth, createEvent);
router.get("/allTasks", auth, getEvents);
router.delete("/deleteTask/:id", auth, deleteEvent);

export default router;
