import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

//configure env
dotenv.config();

//connect db
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});
//PORT
const port = process.env.PORT || 8088;

//run
app.listen(port, () => {
  console.log(`Server running at on ${port}`);
});
