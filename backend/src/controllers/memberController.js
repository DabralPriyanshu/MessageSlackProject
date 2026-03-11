import { StatusCodes } from "http-status-codes";
import {
  customErrorResponse,
  successResponse,
} from "../utils/common/responseObjects.js";
import MemberService from "../services/memberService.js";
const memberService = new MemberService();

const isMemberPartOfWorkspace = async (req, res) => {
  try {
    const response = await this.memberService.isMemberPartOfWorkspace(
      req.params.workspaceId,
      req.user,
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "User is member  of workspace"));
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
export default { isMemberPartOfWorkspace };
