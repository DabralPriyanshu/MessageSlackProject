import { StatusCodes } from "http-status-codes";
import Message from "../models/messageModel.js";
import MessageRepository from "../repositories/messageRepository.js";
import MessageService from "../services/messageService.js";
import ENV from "../config/serverConfig.js";
import {
  customErrorResponse,
  successResponse,
} from "../utils/common/responseObjects.js";
import { s3 } from "../config/awsConfig.js";
const messageRepository = new MessageRepository(Message);
const messageService = new MessageService(messageRepository);

const getMessages = async (req, res) => {
  try {
    const response = await messageService.getMessages(
      { channelId: req.params.channelId },
      req.query.page || 1,
      req.query.limit || 20,
      req.user,
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Messages fetched successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
export const getPresignedUrl = async (req, res) => {
  try {
    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: ENV.AWS_BUCKET_NAME,
      Key: `${Date.now()}`,
      Expires: 60,
    });
    return res
      .status(StatusCodes.OK)
      .json(successResponse({ url }, "Presigned URL fetched successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export default { getMessages, getPresignedUrl };
