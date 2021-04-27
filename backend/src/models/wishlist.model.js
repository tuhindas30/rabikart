const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishListSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  }, { timestamps: true })

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList }