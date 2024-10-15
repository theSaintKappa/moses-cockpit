import { env } from "@/env";
import mongoose from "mongoose";

export async function connectMongo() {
    if (mongoose.connection.readyState === 1) return;

    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}
