import express from "express";
import ENV from "./config/serverConfig.js";
import { StatusCodes } from "http-status-codes";
import connectDB from "./config/dbConfig.js";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "pong" });
});
app.use("/api", apiRoutes);
app.listen(ENV.PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${ENV.PORT}`);
});
