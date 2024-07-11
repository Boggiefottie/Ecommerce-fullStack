import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
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
const filterProduct = asyncHandler(async (req, res) => {
  const { price, productCategory } = req.query;
  if (!price) {
    throw new ApiError(400, "item is required");
  }

  const products = await Product.find({
    $or: [
      {
        price: { $lte: price },
        productCategory: { $regex: new RegExp(productCategory, "i") },
      },
    ],
  });

  console.log(products);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Successfully filtered product"));
});
const sortProduct = asyncHandler(async (req, res) => {
  const { sortBy } = req.query;
  let sortOrder;
  if (sortBy === "highToLow") {
    sortOrder = { price: -1 };
  } else if (sortBy === "lowToHigh") {
    sortOrder = { price: 1 };
  } else {
    sortOrder = {};
  }
  const products = await Product.find().sort(sortOrder);
  console.log(products);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products sorted successfully"));
});
const pagination = asyncHandler(async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
  const aggregate = Product.aggregate();
  const result = await Product.aggregatePaginate(aggregate, options);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Paginated successfully"));
});
const review = asyncHandler(async (req, res) => {
  const { review } = req.body;
  const reviews = await Review.create({
    review,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Review created successfully"));
});

export {
  registerProduct,
  searchProducts,
  filterProduct,
  sortProduct,
  pagination,
  review,
};
