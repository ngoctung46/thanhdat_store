const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  subcategory_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  product_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
}, { timestamps: true });
module.exports = mongoose.model('Category', CategorySchema);
