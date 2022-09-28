const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recordDetailSchema = new Schema({
  operationID: {type: String, require: true},
  oldRecord: {type: Object},
  newRecord: {type: Object}
})

const recordDetailModel = mongoose.model("recordDetail", recordDetailSchema);

module.exports = recordDetailModel