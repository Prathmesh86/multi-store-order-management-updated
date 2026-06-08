import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    item_id: {
      type: String,
      required: [true, "item_id is required"],
      trim: true
    },
    qty: {
      type: Number,
      required: [true, "qty is required"],
      min: [1, "Quantity must be at least 1"]
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      required: [true, "store_name is required"],
      trim: true,
      index: true
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "At least one item is required"
      }
    },
    total_amount: {
      type: Number,
      required: [true, "total_amount is required"],
      min: [0, "Total amount cannot be negative"]
    },
    status: {
      type: String,
      enum: ["PLACED", "PREPARING", "COMPLETED"],
      default: "PLACED",
      index: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        return ret;
      }
    }
  }
);

orderSchema.index({ store_name: 1, created_at: -1 });
orderSchema.index({ created_at: -1 });

export default mongoose.model("Order", orderSchema);
