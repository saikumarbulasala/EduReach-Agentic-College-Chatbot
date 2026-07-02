import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = "edureach_db";
let activeMongoUri: string | null = null;

export const getMongoDbName = (): string => DB_NAME;

export const getActiveMongoUri = (): string | null => {
  if (activeMongoUri) return activeMongoUri;
  if (process.env.ACTIVE_MONGODB_URI) return process.env.ACTIVE_MONGODB_URI;
  return process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL || null;
};

const connectWithUri = async (uri: string, label: string): Promise<void> => {
  const conn = await mongoose.connect(uri, { dbName: DB_NAME });
  activeMongoUri = uri;
  process.env.ACTIVE_MONGODB_URI = uri;
  console.log(`MongoDB Connected (${label}): ${conn.connection.host}`);
  console.log(`MongoDB Database Name: ${conn.connection.name}`);
};

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI;
  const localMongoURI = process.env.MONGODB_URI_LOCAL;

  if (!mongoURI && !localMongoURI) {
    throw new Error("Neither MONGODB_URI nor MONGODB_URI_LOCAL is defined in environment variables");
  }

  let atlasErrorMessage = "";

  if (mongoURI) {
    try {
      await connectWithUri(mongoURI, "Atlas");
      return;
    } catch (error) {
      atlasErrorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Atlas connection failed: ${atlasErrorMessage}`);
      if (localMongoURI) {
        console.warn("Trying local MongoDB fallback...");
      }
    }
  }

  if (localMongoURI) {
    try {
      await connectWithUri(localMongoURI, "Local Fallback");
      return;
    } catch (fallbackError) {
      const fallbackMessage =
        fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
      throw new Error(`Local MongoDB fallback failed: ${fallbackMessage}`);
    }
  }

  if (atlasErrorMessage) {
    throw new Error(`Error connecting to MongoDB Atlas: ${atlasErrorMessage}`);
  }

  throw new Error("No valid MongoDB URI available for connection");
};

export default connectDB;
