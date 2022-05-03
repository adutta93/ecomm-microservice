const Product = require("../models/Product.models");


// to create a new product
exports.createProduct = (req, res) => {
  const { name, description, price, stock, sold } = req.body;
    
    if (!name || !description || !price || !stock) {
      return res.status(400).json({
        err: "Pleas include all the fields",
      });
    }

    let product = new Product({name, description, price, stock, sold });

    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed",
        });
      }
      res.json(product);
    });
};


// to delete product
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      res.status(400).json({
        err: "failed to delete product",
      });
    }
    res.json({
      message: "Product deleted successfully",
      removedProduct,
    });
  });
};

// get all products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json(products);
    });
};



