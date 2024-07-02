import { Router } from "express";

import {
  registerProduct,
  searchProducts,
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
export default router;
