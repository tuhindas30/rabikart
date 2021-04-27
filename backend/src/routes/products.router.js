const express = require("express")
const { Product } = require("../models/product.model")
const router = express.Router();

router.route("/")
  .get(async (_, res) => {
    try {
      let products = await Product.find({})
      products.__v = undefined
      res.json({ success: true, products })
    } catch (error) {
      res.status(500).json({ success: false, message: "Cannot get the products", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const savedProduct = await new Product(product).save();
      res.json({ success: true, savedProduct })
    } catch (error) {
      res.status(500).json({ success: false, message: "Cannot add the product", errorMessage: error.message })
    }
  })

router.param("productId", async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId)
    req.product = product;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: "Error getting product details" })
  }
})

router.route("/:productId")
  .get(async (req, res) => {
    let { product } = req;
    product.__v = undefined
    res.json({ success: true, product })
  })
  .delete(async (req, res) => {
    let { product } = req;
    await product.remove();
    res.json({ success: true, product })
  })

module.exports = router 