import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
    price: {
      type: Number,
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
productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);
