import { StatusCodes } from "http-status-codes";

class ClientError extends Error {
  constructor(error) {
    super();
    this.name = "ClientError";
    this.message = error.message;
    this.statusCode = error.statusCode || StatusCodes.NOT_FOUND;
    this.explanation =
      error.explanation || "The resource your are looking is not found";
  }
}

export default ClientError;
