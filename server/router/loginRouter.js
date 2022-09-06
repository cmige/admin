const express = require("express");

const {UserModel, UserAuthModel, RouteModel} = require("../mongoose");
const bcrypt = require("bcryptjs");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");

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
			userRole: user.user_role,
			createTime: user.create_time,
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
		const route = await RouteModel.findOne({route_id: roleList[i]}, {__v: 0});
		if (route) result.push(route);
	}
	return result;
};


// 后端控制路由
loginRouter.get("/api/userInfo", async (req, res, next) => {
	const {userId} = req.query;
	const user = await UserModel.findById(userId);
	if (user) {
		const user_role = user.user_role;
		if (user_role === "admin" || user_role === "common") {
			const auth = await UserAuthModel.findOne({role_name: user_role});
			if (auth) {
				const routeList = await getRoute(auth.role_list);
				return res.send({
					userId: user._id,
					account: user.account,
					username: user.username,
					routeList
				});
			}
		} else {
			const auth = await UserAuthModel.findById(user_role);
			if (auth) {
				const routeList = getRoute(auth.role_list);
				return res.send({
					userId: user._id,
					account: user.account,
					username: user.username,
					routeList
				});
			}
		}
	} else {
		res.status(401).send({
			message: "用户信息错误"
		});
	}

});

module.exports = loginRouter;