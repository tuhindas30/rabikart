const express = require("express");
const { WishList } = require("../models/wishlist.model")
const { Product } = require("../models/product.model")
const router = express.Router();

router.route("/")
  .get(async (_, res) => {
    try {
      const wishlist = await WishList.find({}).populate("product")
      res.json({ status: "SUCCESS", wishlist })
    } catch (error) {
      res.status(500).json({ status: "ERROR", message: "Cannot get wishlist items", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.body
      const product = await Product.findById(id)
      const wishlistItem = await new WishList({ product }).save()
      return res.json({ status: "SUCCESS", data: wishlistItem, message: `New product added with ID: ${id}` })
      // }
    } catch (error) {
      res.status(500).json({ status: "ERROR", message: "Cannot add into cart", errorMessage: error.message })
    }
  })

router.route("/:wishlistItemId")

.delete(async(req, res) => {

  try {
    const {wishlistItemId} = req.params;
    const wishlistItem = await WishList.findByIdAndDelete(wishlistItemId)
    const wishlist = await WishList.find({}).populate("product");
    res.json({status: "SUCCESS", data: wishlist, message: `Item deleted with ID: ${wishlistItemId}`})
  } catch (error) {
    res.json({status: "ERROR", message: "Item cannot be found", errorMessage: error.message})
  }
})

module.exports = router