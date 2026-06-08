import express from "express";
import {
  createOrder,
  getOrdersByStore,
  updateOrderStatus
} from "../controllers/orderController.js";
import { validateBody, validateQuery } from "../middlewares/validate.js";
import {
  createOrderSchema,
  getOrdersQuerySchema,
  updateStatusSchema
} from "../validations/orderValidation.js";

const router = express.Router();

router.post("/", validateBody(createOrderSchema), createOrder);
router.get("/", validateQuery(getOrdersQuerySchema), getOrdersByStore);
router.patch("/:id/status", validateBody(updateStatusSchema), updateOrderStatus);

export default router;
