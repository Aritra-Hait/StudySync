import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
import { connectDB } from "./config/db.js"



dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

//middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/planner", plannerRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running at PORT", PORT);
    });
})
