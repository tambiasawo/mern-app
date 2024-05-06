import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(function () {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log("an error occured", e.message);
  });
const app = express();

app.use("/api/user/", userRouter);

app.listen(3000, () => {
  console.log("listening on port 3000!");
});
