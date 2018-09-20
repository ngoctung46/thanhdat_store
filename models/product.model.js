const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: Boolean,
  on_sale: Boolean,
  views: { type: Number, default: 0 },
  image_urls: [String],
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
}, { timestamp: true });
module.exports = mongoose.model('Product', ProductSchema);
