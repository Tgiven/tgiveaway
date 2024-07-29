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

// app.use(
//   cors({
//     origin: process.env.ALLOWED_ORIGINS,
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     credentials: true
//   })
// );
const allowedOrigins = ['https://tesla-giveaway.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
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
app.options('*', cors()); // enable pre-flight across-the-board

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
