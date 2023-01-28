import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

const router = express();

// Conntect Mongo
mongoose.set("strictQuery", false);
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info("Successfully Conntected to MongoDB");
    })
    .catch((error) => {
        Logging.error("Unable to conntect to MongoDB");
        Logging.error(error);
    });
