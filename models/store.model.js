const mongoose = require('mongoose');
const StoreSchema = mongoose.Schema({
  name: String,
  location: String,
  phone: String,
  category_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
}, { timestamp: true });
module.exports = mongoose.model('Store', StoreSchema);
