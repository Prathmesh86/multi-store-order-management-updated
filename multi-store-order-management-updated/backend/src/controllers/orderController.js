import mongoose from "mongoose";
import Order from "../models/Order.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    return successResponse(res, 201, "Order created successfully", order);
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStore = async (req, res, next) => {
  try {
    const { store_name, page, limit } = req.query;
    const skip = (page - 1) * limit;
    const filter = store_name ? { store_name: { $regex: store_name, $options: "i" } } : {};

    const [orders, totalOrders] = await Promise.all([
      Order.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean({ virtuals: true }),
      Order.countDocuments(filter)
    ]);

    return successResponse(res, 200, "Orders fetched successfully", orders, {
      page,
      limit,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 400, "Invalid MongoDB order id");
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    return successResponse(res, 200, "Order status updated successfully", order);
  } catch (error) {
    next(error);
  }
};
