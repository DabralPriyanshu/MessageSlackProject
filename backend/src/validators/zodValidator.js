import { StatusCodes } from "http-status-codes";
import { customErrorResponse } from "../utils/common/responseObjects.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      let explanation = [];
      const parseObject = JSON.parse(error.message);
      for (let err of parseObject) {
        explanation.push(`${err.message} for ${err.path} `);
      }
      console.log(explanation);

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          customErrorResponse({
            message: "Validation failed on some fields",
            explanation: explanation,
          }),
        );
    }
  };
};
