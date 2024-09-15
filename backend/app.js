import { configDotenv } from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js"
import taskRoute from "./routes/taskRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

configDotenv({
    path:"./config/config.env"
})
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/user', taskRoute);


export default app;