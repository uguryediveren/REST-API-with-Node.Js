var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  created_date: { type: Date, default: Date.now }
});

var Product = mongoose.model("Stock", productSchema);

module.exports = Product;
