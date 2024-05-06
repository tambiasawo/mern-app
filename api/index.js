import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//X9dr2OJcaMnjyFnr
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

app.listen(3000, () => {
  console.log("listening on port 3000!");
});
