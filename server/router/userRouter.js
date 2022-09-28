const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../mongoose")
const filter = {password: 0, __v: 0}
const {addUser, deleteUser, modifyUser} = require("../utils/user.aop")
const {responseCodeMap, responseMessageMap} = require("../utils/responseMap")
const {operationType, createRecordObj} = require("../utils/recordOperation");
const {simpleResponse} = require("../utils/other")
const message = responseMessageMap.userRouter


const operationTarget = "UserModel"

userRouter.get("/api/userList", async (req, res, next) => {
  const result = await UserModel.find({account: {"$ne": ""}}, filter)
  if (result) {
    const userList = result.map(item => {
      return {
        userId: item._id,
        account: item.account,
        username: item.username,
        userRole: item.userRole,
        createTime: item.createTime,
        phone: item.phone,
        email: item.email
      }
    })
    return simpleResponse(res, responseCodeMap.success, responseMessageMap.getSuccess, {userList})
    //  res.status(200).send({
    // 	userList: result.map(item => {
    // 		return {
    // 			userId: item._id,
    // 			account: item.account,
    // 			username: item.username,
    // 			userRole: item.userRole,
    // 			createTime: item.createTime,
    // 			phone: item.phone,
    // 			email: item.email
    // 		}
    // 	})
    // })
  }
})

userRouter.post("/api/addUser", async (req, res, next) => {
  const {userInfo, currentUser} = req.body

  addUser(async () => {
    const _info = {
      account: userInfo.account,
      password: userInfo.password,
      userName: userInfo.userName,
      phone: userInfo.phone,
      email: userInfo.email,
      userRole: userInfo.role
    }
    const result = await UserModel.create(_info)

    if (!result) {
      simpleResponse(res, responseCodeMap.failed, message.addFailed)
      return false
    }

    const recordObj = {
      operator: currentUser,
      operationType: operationType.create,
      operationTarget,
      newRecord: result
    }

    simpleResponse(res, responseCodeMap.success, message.addSuccess)

    return createRecordObj(recordObj)
  })
})

userRouter.post("/api/modifyUser", async (req, res, next) => {
  const {userInfo, currentUser} = req.body
  modifyUser(async () => {
    const oldInfo = await UserModel.findOne({_id: userInfo.userId}, filter)
    if (!oldInfo) {
      simpleResponse(res, responseCodeMap.failed, message.modifyFailed)
      return false
    }
    const _info = {
      account: userInfo.account,
      userName: userInfo.userName,
      phone: userInfo.phone,
      email: userInfo.email,
      userRole: userInfo.role
    }

    const result = await UserModel.updateOne({_id: userInfo.userId}, _info, filter)
    if (!oldInfo) {
      simpleResponse(res, responseCodeMap.failed, message.modifyFailed)
      return false
    }

    const recordObj = {
      operator: currentUser,
      operationType: operationType.create,
      operationTarget,
      oldRecord: oldInfo,
      newRecord: result
    }

    simpleResponse(res, responseCodeMap.success, message.modifySuccess)

    return createRecordObj(recordObj)

  })
})

userRouter.post("/api/userDelete", async (req, res, next) => {
  const {currentUser, deleteUserId} = req.body
  deleteUser(async () => {
    const result = await UserModel.findOneAndDelete({_id: deleteUserId}, filter)
    if (!result) {
      simpleResponse(res, responseCodeMap.failed, message.deleteFailed)
      return false
    }

    simpleResponse(res, responseCodeMap.failed, message.deleteSuccess)

    const recordObj = {
      operator: currentUser,
      operationType: operationType.delete,
      operationTarget,
      oldRecord: result,
    }
    return createRecordObj(recordObj)
  })
})


module.exports = userRouter