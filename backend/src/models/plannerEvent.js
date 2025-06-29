import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

export default mongoose.model("PlannerEvent", calendarEventSchema);
