const express = require("express");

const {UserModel, UserAuthModel, RouteModel} = require("../mongoose");
const bcrypt = require("bcryptjs");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const {simpleResponse} = require("../utils/other");
const {responseCodeMap, responseMessageMap} = require("../utils/responseMap");
const message = responseMessageMap.loginRouter
const filter = {password: 0, __v: 0};

const expiration = 60 * 60 * 24;  // 过期时间

loginRouter.post("/api/register", async (req, res, next) => {
  const user = await UserModel.create({
    account: req.body.account,
    password: req.body.password
  });
  res.send(user);
  // res.send("register")
});

loginRouter.post("/api/login", async (req, res, next) => {
  const user = await UserModel.findOne({
    account: req.body.account
  });

  if (!user) {
    return res.status(422).send({
      message: "帐号不存在"
    });
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) return res.status(401).send({
    message: "帐号或密码错误"
  });
  // token 过期时间设置为 1 天
  const token = jwt.sign({
    id: user._id,
    ctime: Date.now(),
  }, process.env.JWT_SECRET, {expiresIn: expiration});


  res.send({
    user: {
      account: user.account,
      username: user.username,
      userRole: user.userRole,
      createTime: user.createTime,
      userId: user._id
    },
    token,
    expiration
  });

});

const getRoute = async (roleList) => {
  if (!roleList.length) return null;
  const result = [];
  for (let i = 0; i < roleList.length; i++) {
    const route = await RouteModel.findOne({routeId: roleList[i]}, {__v: 0, _id: 0});
    if (route) result.push(route);
  }
  return result;
};


// 后端控制路由
loginRouter.get("/api/userInfo", async (req, res, next) => {
  const {userId} = req.query;
  const user = await UserModel.findById(userId);
  if (user) {
    console.log(user)
    const userRole = user.userRole;
    // 合并权限
    const roleListSet = new Set()
    for (let i = 0; i < userRole.length; i++) {
      let _roleList = []
      let userAuth
      if (userRole[i] === "admin" || userRole[i] === "common") {
        userAuth = await UserAuthModel.findOne({roleName: userRole[i]})
      } else {
        userAuth = await UserAuthModel.findOne({_id: userRole[i]})
      }
      if (!userAuth) {
        return
      }
      _roleList = userAuth.roleList
      _roleList?.forEach(i => {
        roleListSet.add(i)
      })
    }
    const roleList = Array.from(roleListSet)
    const result = await getRoute(roleList);
    return simpleResponse(res, responseCodeMap.success, message.getUserInfoSuccess, {
      userId: user._id,
      account: user.account,
      username: user.username,
      roleList: result
    })
    //  res.status(200).send({
    // 	userId: user._id,
    // 	account: user.account,
    // 	username: user.username,
    // 	roleList: result
    // });
  } else {
    return simpleResponse(res, responseCodeMap.failed, message.getUserInfoFailed)

  }
});

module.exports = loginRouter;