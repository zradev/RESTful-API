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
        StartServer();
    })
    .catch((error) => {
        Logging.error("Unable to conntect to MongoDB");
        Logging.error(error);
    });

// Strat the server if Mongo connects
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the Request
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on("finish", () => {
            // Log the Response
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // API Rules
    router.use((req, res, next) => {
        // Replace * with a list of IPs if u want this to be private
        res.header("Access-Control-Allow-Origin", "*");
        // Allowed Headers
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });

    // Routes

    // Healthcheck
    router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));

    // Error Handling
    router.use((req, res, next) => {
        const error = new Error("Not Found");
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running of port ${config.server.port}.`));
};
