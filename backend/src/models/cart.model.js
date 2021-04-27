const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: {
    type: Number,
    required: "Cannot enter an item in cart without its quantity",
    min: [1, "Quantity cannot be less than zero"]
  },
},
  { _id: false },
)

const CartSchema = new Schema(
  {
    item: CartItemSchema
  }, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart }