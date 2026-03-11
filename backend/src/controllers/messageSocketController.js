import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT,
} from "../utils/common/eventConstants.js";
import { StatusCodes } from "http-status-codes";
import Message from "../models/messageModel.js";
import MessageRepository from "../repositories/messageRepository.js";
import MessageService from "../services/messageService.js";
const messageRepository = new MessageRepository(Message);
const messageService = new MessageService(messageRepository);
export default function messageHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessage(data, cb) {
    const { channelId } = data;
    const messageResponse = await messageService.createMessage(data);
    //  socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    cb({
      success: true,
      message: "Successfully created the message",
      data: messageResponse,
    });
  });
}
