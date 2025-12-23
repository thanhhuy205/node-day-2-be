import { appRouter } from "@/routes/index.js";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
const acceptOrigin = process.env.CLIENT_URL ?? "*";
const allowOrigins = ["http://localhost:5173", acceptOrigin];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allow"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api", appRouter);

export { app };
