import express from "express";
import ENV from "./config/serverConfig.js";
import { StatusCodes } from "http-status-codes";
import connectDB from "./config/dbConfig.js";
import apiRoutes from "./routes/apiRoutes.js";
import bullServerAdapter from "./config/bullBoardConfig.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import MessageSocketHandlers from "./controllers/messageSocketController.js";
import ChannelSocketHandlers from "./controllers/channelSocketController.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "pong" });
});
app.use("/ui", bullServerAdapter.getRouter());
app.use("/api", apiRoutes);

io.on("connection", (socket) => {
  // console.log("User connected ", socket.id);
  // socket.emit("msg", { msg: "hello" });
  MessageSocketHandlers(io, socket);
  ChannelSocketHandlers(io, socket);
});
server.listen(ENV.PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${ENV.PORT}`);
  console.log(
    `BullBoard dashboard running on: http://localhost:${ENV.PORT}/ui`,
  );
});
