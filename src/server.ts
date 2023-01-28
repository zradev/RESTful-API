import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";

const router = express();

// Conntect Mongo
mongoose.set("strictQuery", false);
mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log("Successfully Conntected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });
