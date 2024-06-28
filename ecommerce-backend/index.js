import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`connected to MongoDB database ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 8090;

connectDB();

server.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
/*





*/
