// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import Tracking from "./models/trackingModel.js";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
import trackingRouter from "./routes/trackingInfo.js";
import authenticationRouter from "./routes/authenticationRouter.js";
// const cors = require("cors");
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use("/api/tracking", trackingRouter);
app.use("/api/auth", authenticationRouter);

//CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("connected to backend! on PORT:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
