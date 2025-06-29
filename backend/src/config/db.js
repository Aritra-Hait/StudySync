import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB Connected succesfully");
    } catch (err) {
        console.error("Error coonnecting to MONGODB : ", err);
        process.exit(1)
    }
}