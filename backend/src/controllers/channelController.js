import { StatusCodes } from "http-status-codes";
import Channel from "../models/channelModel.js";
import ChannelRepository from "../repositories/channelRepository.js";
import ChannelService from "../services/channelService.js";
import {
  customErrorResponse,
  successResponse,
} from "../utils/common/responseObjects.js";
const channelRepository = new ChannelRepository(Channel);
const channelService = new ChannelService(channelRepository);
const getChannelById = async (req, res) => {
  try {
    const response = await channelService.getChannelById(
      req.params.channelId,
      req.user,
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Channel fetched successfully"));
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
export default { getChannelById };
