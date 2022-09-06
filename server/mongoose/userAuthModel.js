const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const routeList = require("../router/route");

const userAuthSchema = new Schema({
	role_id: {type: Number},
	role_name: {type: String, required: true},
	createTime: {type: Number, default: Date.now()},
	auth_name: {type: String},
	auth_time: {type: Number},
	role_list: {type: Array, require: true, default: []},
});


const commonRoleList = () => {
	const list = [];
	const limit = [3, 4, 5];
	let pidArr = [];

	routeList.sort((a, b) => a.route_id - b.route_id).forEach(route => {
		if (limit.indexOf(route.route_id) !== -1) {
			pidArr.push(route.route_id);
		} else {
			if (pidArr.length) {
				if (pidArr.indexOf(route.pid) !== -1 || pidArr.indexOf(route.route_id) !== -1) {
					pidArr.push(route.route_id);
				} else {
					list.push(route.route_id);
				}
			} else {
				list.push(route.route_id);
			}
		}
	});
	return list;
};


const userRoleList = [
	{
		role_name: "admin",
		role_list: routeList.map(route => {
			return route.route_id;
		})
	},
	{
		role_name: "common",
		role_list: commonRoleList()
	},
];


const userAuthModel = mongoose.model("user-auth", userAuthSchema);

const createRole = async (role) => {
	const hasRole = await userAuthModel.findOne({role_name: role.role_name});
	if (!hasRole) userAuthModel.create(role);
};

userRoleList.forEach(role => {
	createRole(role);
});

module.exports = userAuthModel;