const mongoose = require("mongoose");
require('mongoose-type-url');

const { Schema } = mongoose;

const SpecificationSchema = new Schema({
  label: String,
  value: String
}, {_id: false})

const ProductSchema = new Schema({
  modelName: {
    type: String,
    required: "Cannot add a product without name"
  },
  modelNo: {
    type: String,
    required: "Cannot add a product without its model number",
    unique: true
  },
  imageUrl: {
    type: mongoose.SchemaTypes.Url,
    required: "Cannot add a product without an image URL"
  },
  rating: {
    "5": Number,
    "4": Number,
    "3": Number,
    "2": Number,
    "1": Number
  },
  avgRating: Number,
  noOfRatings: Number,
  noOfReviews: Number,
  price: {
    type: Number,
    required: "Cannot add a product without its price"
  },
  discount: Number,
  discountedPrice: Number,
  offers: [String],
  deliveryWithin: Number,
  services: [String],
  seller: {
    type: String,
    required: "Cannot add a product without its seller name"
  },
  sellerRating: Number,
  description: {
    type: String,
    maxLength: [1000, "Can't add more than 1000 characters"]
  },
  specifications: [SpecificationSchema]
},
  {
    timestamps: true
  })

const Product = mongoose.model("Product", ProductSchema)

module.exports = { Product }