const express = require("express")
const {UserAuthModel} = require("../mongoose")
const {responseCodeMap, responseMessageMap} = require("../utils/responseMap")

const roleRouter = express.Router()
const filter = {password: 0, __v: 0}
const responseMessage = responseMessageMap.roleRouter
const {addRole, setRole, deleteRole} = require("../utils/role.aop")

const {createRecordObj, operationType} = require("../utils/recordOperation")
const {simpleResponse} = require("../utils/other");

const operationTarget = "UserAuthModel"

roleRouter.get("/api/roleList", async (req, res, next) => {
  const result = await UserAuthModel.find({roleName: {"$ne": ""}}, filter)
  if (result) {
    const roleList = result.map(item => {
      return {
        roleName: item.roleName,
        createTime: item.createTime,
        authName: item.authName,
        authTime: item.authTime,
        roleList: item.roleList,
        roleId: item._id,
      }
    })
    return simpleResponse(res, responseCodeMap.success, responseMessageMap.getSuccess, {roleList})
  }
})

roleRouter.post("/api/addRole", async (req, res, next) => {
  addRole(async () => {
    const {roleInfo, currentUser} = req.body
    if (await checkRoleName(roleInfo.roleName, res)) {
      return false
    }
    if (!roleInfo.authName) {
      simpleResponse(res, responseCodeMap.failed, responseMessageMap.currentLost)
      return false
    }

    const result = await UserAuthModel.create({
      roleName: roleInfo.roleName,
      authName: roleInfo.authName,
      roleList: roleInfo.roleList,
      authTime: Date.now(),
      createTime: Date.now()
    })

    if (!result) {
      simpleResponse(res, responseCodeMap.failed, responseMessage.addFailed)
      return false
    }
    simpleResponse(res, responseCodeMap.success, responseMessage.addSuccess)

    const recordObj = {
      operator: currentUser,
      operationType: operationType.create,
      operationTarget,
      newRecord: result
    }

    return createRecordObj(recordObj)

  })
})

roleRouter.post("/api/setRole", async (req, res, next) => {
  setRole(async () => {
    const {roleInfo, currentUser} = req.body
    const isExist = await UserAuthModel.findById(roleInfo.roleId)
    if (!isExist) {
      simpleResponse(res, responseCodeMap.failed, responseMessage.notFoundRole)
      return false
    }
    // 修改
    const rawRoleName = isExist[0].roleName
    if (rawRoleName !== roleInfo.roleName) {
      if (await checkRoleName(roleInfo.roleName, res)) {
        return false
      }
    }

    const result = await UserAuthModel.updateOne({_id: roleInfo.roleId}, {
      roleName: roleInfo.roleName,
      roleList: roleInfo.roleList,
    })

    if (!result) {
      simpleResponse(res, responseCodeMap.failed, responseMessage.updateFailed)
      return false
    }
    simpleResponse(res, responseCodeMap.success, responseMessage.updateSuccess)

    const recordObj = {
      operator: currentUser,
      operationType: operationType.update,
      operationTarget,
      oldRecord: isExist[0],
      newRecord: result
    }
    return createRecordObj(recordObj)
  })

})

roleRouter.post("/api/deleteRole", async (req, res, next) => {
  deleteRole(async () => {
    const {currentUser, roleId} = req.body

    const result = await UserAuthModel.findOneAndDelete({_id: roleId})
    if (!result) {
      simpleResponse(res, responseCodeMap.failed, responseMessage.deleteFailed)
      return false
    }

    simpleResponse(res, responseCodeMap.success, responseMessage.deleteSuccess)

    const recordObj = {
      operator: currentUser,
      operationType: operationType.delete,
      operationTarget,
      oldRecord: result,
      newRecord: null
    }

    return createRecordObj(recordObj)
  })
})

const checkRoleName = async (roleName, res) => {
  const isExist = await UserAuthModel.findOne({roleName: roleName})
  if (isExist) {
    simpleResponse(res, responseCodeMap.failed, responseMessage.hasRole)
    return true
  } else {
    return false
  }

}
module.exports = roleRouter