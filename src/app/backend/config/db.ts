import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

export async function connectToDatabase(): Promise<void> {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect("mongodb+srv://Execution:Execution@cluster0.5mtur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" as string);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw new Error('Database connection failed');
    }
}
