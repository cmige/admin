const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// bcrypt 用于密码加密
const userSchema = new Schema({
	account: {type: String, required: true, unique: true},
	password: {
		type: String, required: true,
		set(val) {
			return bcrypt.hashSync(val, 10);
		}
	},
	username: {type: String, required: true, unique: true},
	create_time: {type: Number, default: Date.now},
	phone: {type: Number},
	user_role: {type: String}
});


const UserModel = mongoose.model("Users", userSchema);

const createSuperAccount = async () => {
	const user = await UserModel.findOne({account: "admin"});
	if (!user) UserModel.create({account: "admin", password: "admin", user_role: "admin", username: "admin"});
};

createSuperAccount();

module.exports = UserModel;