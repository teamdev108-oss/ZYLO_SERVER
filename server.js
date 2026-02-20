import express from "express";
import { config } from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`app running port ${port}`);
  });
});
