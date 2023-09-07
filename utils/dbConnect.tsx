import mongoose from "mongoose";

const dbURL: string = process.env.DB_URL!;

const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(dbURL)
}

export default dbConnection;