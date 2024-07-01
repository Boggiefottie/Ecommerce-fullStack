import { Product } from "../models/product.model";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerProduct = asyncHandler(async (req, res) => {
  const { productName, productCategory, productDescription, owner } = req.body;
  if (
    [productName, productCategory, productDescription, owner].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
});
export { registerProduct };
