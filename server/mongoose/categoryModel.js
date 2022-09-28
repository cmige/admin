const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {type: String, require: true},
  parentId: {type: String},
  icon: {type: String},
})

const categoryModel = mongoose.model("category", categorySchema)