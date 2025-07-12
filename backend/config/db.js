import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("MONGODB_URL:", process.env.MONGODB_URL); // Add this line

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("DB connected");
    });
};
