import dotenv from "dotenv";
import connectDB from "./dbConfig/index.js";
import express from "express";
dotenv.config();
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`MongoDB running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error: ", err);
  });
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
