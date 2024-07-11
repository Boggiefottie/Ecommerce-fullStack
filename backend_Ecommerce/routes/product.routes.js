import { Router } from "express";

import {
  registerProduct,
  searchProducts,
  filterProduct,
  sortProduct,
  pagination,
  review,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/registerProduct").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 5,
    },
  ]),
  registerProduct
);
router.route("/searchProducts").get(searchProducts);
router.route("/filterProducts").get(filterProduct);
router.route("/sortProducts").get(sortProduct);
router.route("/paginate").get(pagination);
router.route("/postReview").post(review);
export default router;
