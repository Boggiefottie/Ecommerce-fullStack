import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    ManufacturingOwner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
productSchema.index({
  productName: "text",
  productCategory: "text",
  ManufacturingOwner: "text",
});

export const Product = mongoose.model("Product", productSchema);
