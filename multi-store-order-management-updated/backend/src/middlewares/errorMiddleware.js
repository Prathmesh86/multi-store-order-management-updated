import mongoose from "mongoose";
import { errorResponse } from "../utils/apiResponse.js";

export const notFound = (req, res) => {
  return errorResponse(res, 404, `Route not found: ${req.originalUrl}`);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof mongoose.Error.CastError) {
    return errorResponse(res, 400, "Invalid resource id");
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, 400, "Database validation failed", errors);
  }

  return errorResponse(res, err.statusCode || 500, err.message || "Internal server error");
};
