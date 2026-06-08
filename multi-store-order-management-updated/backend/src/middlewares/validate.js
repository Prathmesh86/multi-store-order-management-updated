import { errorResponse } from "../utils/apiResponse.js";

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return errorResponse(res, 400, "Validation failed", result.error.flatten().fieldErrors);
  }
  req.body = result.data;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return errorResponse(res, 400, "Validation failed", result.error.flatten().fieldErrors);
  }
  req.query = result.data;
  next();
};
