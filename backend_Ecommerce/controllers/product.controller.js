import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    productCategory,
    productDescription,
    ManufacturingOwner,
    price,
  } = req.body;
  if (
    [
      productName,
      productCategory,
      productDescription,
      ManufacturingOwner,
      price,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const productImageLocalPath = req.files?.productImage[0]?.path;
  console.log(req.files);
  if (!productImageLocalPath) {
    throw new ApiError(400, "Product Image is required");
  }
  const productImage = await uploadOnCloudinary(productImageLocalPath);
  if (!productImage) {
    throw new ApiError(400, "Failed to upload product image");
  }

  const product = await Product.create({
    productName,
    productCategory,
    productDescription,
    productImage: productImage?.url,
    ManufacturingOwner,
    price,
  });
  const createdProduct = await Product.findById(product._id);
  if (!createdProduct) {
    throw new ApiError(
      500,
      "Something wrong happened while rgistering for the product"
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdProduct,
        "Successfully registered the product"
      )
    );
});
const searchProducts = asyncHandler(async (req, res) => {
  const { item } = req.query;

  if (!item) {
    throw new ApiError(400, "Search query is required");
  }
  const products = await Product.find({
    $text: { $search: item },
  });
  if (!products.length) {
    throw new ApiError(400, "cannot search required itme");
  }
  console.log(products);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "product searched succesfully"));
});

export { registerProduct, searchProducts };
