import express from "express";
import cors from "cors";
import Route from "./app/route/route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

export const app = express();
app.use(express.json());
app.use(cors({ origin: "https://lcd-frontend.vercel.app", credentials: true }));
app.use("/api/v1", Route);
app.use(globalErrorHandler);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
