const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recordSchema = new Schema({
  operator: {type: String, require: true},
  operationTime: {type: Date},
  operationType: {type: String},
  operationTarget: {type: String, require: true},
  requestMethod: {type: String},
})

const recordModel = mongoose.model("record", recordSchema);


module.exports = recordModel