const express = require("express");
const loginRouter = require("./router/loginRouter");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
require("dotenv").config();
// 连接数据库
require("./mongoose/connect");
// 初始化基本数据
require("./mongoose");


const port = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

// 使用 expressjwt 代替
const auth = async (req, res, next) => {
	const rawToken = String(req.headers.authorization.split(" ").pop());
	try {
		const {id} = jwt.verify(rawToken, process.env.JWT_SECRET);
		req.header.userId = id;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(430).send({
				message: "token失效,请重新登录"
			});
		} else if (error.name === "JsonWebTokenError") {
			return res.status(401).send({
				message: "无效的Token"
			});
		} else {
			return res.status(500).send({
				message: `未知错误-${error.name}`
			});
		}
	}


};

const whiteList = ["/api/login", "/api/getUserRoute"];
app.use(
	expressjwt.expressjwt({
		secret: process.env.JWT_SECRET,
		algorithms: ["HS256"],
	}).unless({
		path: whiteList
	}),
);

app.use(loginRouter);

app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		res.status(401).send({
			message: "失效的token，请重新登录"
		});
	} else {
		next(err);
	}
});


app.listen(port, () => {
	console.log("serve is running ...");
});