import { z } from "zod";

const orderItemSchema = z.object({
  item_id: z.string().trim().min(1, "item_id is required"),
  qty: z.coerce.number().int("qty must be an integer").positive("qty must be greater than 0")
});

export const createOrderSchema = z.object({
  store_name: z.string().trim().min(1, "store name is required"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  total_amount: z.coerce.number().nonnegative("total_amount cannot be negative")
});

export const updateStatusSchema = z.object({
  status: z.enum(["PLACED", "PREPARING", "COMPLETED"], {
    errorMap: () => ({ message: "status must be PLACED, PREPARING, or COMPLETED" })
  })
});

export const getOrdersQuerySchema = z.object({
  store_name: z.string().trim().optional().default(""),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10)
});
