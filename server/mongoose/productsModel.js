const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {type: String, require: true},
  parentId: {type: String},
  price: {type: Number, required: true},
  desc: {type: String},
  status: {type: Number, default: 1},
  imgs: {type: Array, default: []},
  detail: {type: String},
  brand: {type: String}
})

const categoryModel = mongoose.model("category", productSchema)