import express from "express";
import ENV from "./config/serverConfig.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});
app.listen(ENV.PORT, () => {
  console.log(`Server started at http://localhost:${ENV.PORT}`);
});
