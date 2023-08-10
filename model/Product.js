const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: String,
      required: true,
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: "productCategory",
      required: true,
   },
   userId: {
      type: String,
      required: true,
   },
   company: {
      type: String,
      required: true,
   },
   selectedImages: {
      type: String,
      required: true
   }
});
module.exports = mongoose.model('product', productSchema)