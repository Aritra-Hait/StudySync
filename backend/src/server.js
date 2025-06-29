import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
import { connectDB } from "./config/db.js"



dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000


//middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/planner", plannerRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running at PORT", PORT);
    });
})
