const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controller/product.controller");
const { isAuthenticated } = require("../../root/middleware/auth.middleware");

// create
router.post(
  "/product/create/",
  // isAuthenticated,
  createProduct
);

// listing route
router.get("/products", getAllProducts);



module.exports = router;