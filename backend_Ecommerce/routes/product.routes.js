import { Router } from "express";

import { registerProduct } from "../controllers/product.controller.js";
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
export default router;
