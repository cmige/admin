const responseCodeMap = {
  success: 200,
  failed: -1
}


const responseMessageMap = {
  getSuccess: "请求数据成功",
  getFailed: "请求数据失败",
  loginRouter: {
    getUserInfoSuccess: "获取用户信息成功",
    getUserInfoFailed: "获取用户信息失败",
    success: "登录成功"
  },
  roleRouter: {
    success: "",
    addSuccess: "角色添加成功",
    addFailed: "角色添加失败",
    updateSuccess: "角色修改成功",
    updateFailed: "角色修改失败",
    deleteSuccess: "角色删除成功",
    deleteFailed: "角色删除失败",

    hasRole: "角色名已存在",
    notFoundRole: "该角色不存在"
  },
  userRouter: {
    deleteSuccess: "用户删除成功",
    deleteFailed: "用户删除失败",
    addSuccess: "用户添加成功",
    addFailed: "用户添加失败",
    modifySuccess: "用户修改失败",
    modifyFailed: "用户修改失败",
  },
  currentLost: "当前用户信息丢失，请重新登录再进行操作"

}

module.exports = {
  responseCodeMap,
  responseMessageMap
}