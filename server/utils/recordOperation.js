const {RecordDetailModel, RecordModel} = require('../mongoose')

async function recordOperation(data) {
  if (data) {
    const result = await RecordModel.create({
      operator: data.operator,
      operationTime: data.operationTime,
      operationType: data.operationType,
      operationTarget: data.operationTarget,
      requestMethod: data.requestMethod
    })
    if (result) {
      await RecordDetailModel.create({
        operationID: result._id,
        oldRecord: data.oldRecord,
        newRecord: data.newRecord
      })
    }
  }
}

/**
 *
 * @param {
 *   operator: string,
 *   operationType: string,
 *   operationTarget: string,
 *   requestMethod?: string,
 *   oldRecord?: object
 *   newRecord?: object
 * }
 * @returns {{operationTarget: (string|*), requestMethod: (string|{type: String | StringConstructor}|*), operationType, oldRecord: ({type: Object | ObjectConstructor}|*|null), operator: *, newRecord: (*|null), operationTime: number}}
 */
const createRecordObj = (recordObj) => {
  return {
    operator: recordObj.operator,
    operationTime: Date.now(),
    operationType: recordObj.operationType,
    operationTarget: recordObj.operationTarget,
    requestMethod: recordObj.requestMethod || "POST",
    oldRecord: recordObj.oldRecord || null,
    newRecord: recordObj.newRecord || null,
  }
}

const operationType = {
  create: "create",
  update: "update",
  delete: "delete"
}

module.exports = {
  recordOperation,
  createRecordObj,
  operationType
}