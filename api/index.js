import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";

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

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
/*custom middleware for errors - THIS IS THE NEXT MIDDLEWARE AFTER THE /signup middleware above. Hence next in the authcontroller points to this. R
Remember to always add next as a parameter in your middleware */

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening on port 3000!");
});
