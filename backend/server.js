import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from 'morgan'

const app = express();
dotenv.config();


import hotelRouter from "./routes/hotelRoute.js";
import hotelEmpRouter from "./routes/hotelEmpRoute.js";
import hotelRequestsRouter from "./routes/requestRoute.js";
import epcornRouter from "./routes/epcornUserRoute.js";
import { notFoundError } from "./middleware/not-found.js";
import { authenticateUser } from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/hotel", hotelRouter);
app.use("/api/hotel/employee", hotelEmpRouter);
app.use("/api/hotel/request", hotelRequestsRouter);
app.use("/api/epcorn", epcornRouter);

app.use(notFoundError);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
