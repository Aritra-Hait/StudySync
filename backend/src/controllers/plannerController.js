import PlannerEvent from "../models/plannerEvent.js";

export const createEvent = async (req, res) => {
    try {
        const { title, task, start, end } = req.body;
        const newEvent = new PlannerEvent({ title, task, start, end, userId: req.user.id });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: "Failed to add event" });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await PlannerEvent.find({ userId: req.user.id });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete only if the event belongs to the current user
        const deletedEvent = await PlannerEvent.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found or not authorized" });
        }

        res.status(200).json({ message: "Event deleted" });
    } catch (err) {
        console.error("Error in deleteEvent:", err);
        res.status(500).json({ error: "Failed to delete event" });
    }
};

