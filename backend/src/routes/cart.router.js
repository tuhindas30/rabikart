const express = require("express");
const { extend } = require("lodash")
const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")
const router = express.Router();

router.route("/")
  .get(async (_, res) => {
    try {
      const cart = await Cart.find({}).populate("item.product")
      res.json({ success: true, cart })
    } catch (error) {
      res.status(500).json({ success: false, message: "Cannot get cart items", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.body
      const product = await Product.findById(id)
      const cart = await new Cart({ item: { product, quantity: 1 } }).save()
      res.json({ status: "SUCCESS", data: cart, message: `New product added with ID: ${id}` })
    } catch (error) {
      res.status(500).json({ success: false, message: "Cannot add into cart", errorMessage: error.message })
    }
  })

router.param("cartItemId", async (req, res, next, id) => {

  try {

    const cartItem = await Cart.findById(id)

    if (!cartItem)
      return res.json({ status: "ERROR", message: "Error getting cart item" })

    req.cartItem = cartItem;
    next();
  } catch (error) {

    res.status(404).json({ status: "ERROR", message: "Error retrieving cart item" })
  }
})

router.route("/:cartItemId")
  .get(async (req, res) => {
    const { cartItemId } = req.params;
    let { cartItem } = req;
    cartItem.__v = undefined;
    // const cartitem = await Cart.findById(cartItemId).populate("item.product")
    res.json({ success: true, cartItem })
  })

  .post(async (req, res) => {
    const update = req.body
    let { cartItem } = req;
    cartItem = extend(cartItem, update);
    cartItem = await cartItem.save()
    const cart = await Cart.find({}).populate("item.product");
    res.json({ status: "SUCCESS", data: cart })
  })

  .delete(async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const cartItem = await Cart.deleteOne({ _id: cartItemId });
      const cart = await Cart.find({}).populate("item.product");
      res.json({ status: "SUCCESS", data: cart, message: `Successfully removed cart item with id ${cartItemId}` })
    } catch (error) {
      res.status(500).json({ success: false, message: "Cannot delete the product", errorMessage: error.message })
    }
  })

module.exports = router