const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const routeList = require("../router/route");

/**
 * role_id： 路由id
 * pid：     路由父id
 * path：    路由路径
 * name:     路由名称
 * title:    路由标题
 * link：    子路由完整路径
 * icon:     路由图标 （elementIconName）
 */
const routeSchema = new Schema({
	route_id: {type: Number, required: true, unique: true},
	pid: {type: Number},
	path: {type: String, required: true},
	name: {type: String, required: true},
	title: {type: String, required: true},
	link: {type: String},
	icon: {type: String},
	component: {type: String, require: true},
});

const routeModel = mongoose.model("routes", routeSchema);

const createRoute = async (route) => {
	const result = await routeModel.findOne({route_id: route.route_id});
	if (!result) routeModel.create(route);
};
for (let i = 0; i < routeList.length; i++) {

	createRoute(routeList[i]);
}

module.exports = routeModel;