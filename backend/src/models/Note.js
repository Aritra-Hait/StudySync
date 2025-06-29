import mongoose, { Mongoose } from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    content: {
        type: "string",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    image: {
        type: String //imageURL
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;