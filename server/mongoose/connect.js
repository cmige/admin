const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL_TEST, {
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => console.log("数据库连接失败"));

db.once("open", () => console.log("数据库连接成功"));