import express from "express";
import { config } from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";

config();
const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());

app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(errorHandler);
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`app running port ${port}`);
  });
});
