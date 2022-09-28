const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const routeList = require("../utils/route");

const userAuthSchema = new Schema({
  roleName: {type: String, required: true, unique: true},
  createTime: {type: Date, default: Date.now},
  authName: {type: String},
  authTime: {type: Date},
  roleList: {type: [Number], require: true, default: []},
});


const commonRoleList = () => {
  const list = [];
  const limit = [3, 4, 5];
  let pidArr = [];

  routeList.sort((a, b) => a.routeId - b.routeId).forEach(route => {
    if (limit.indexOf(route.routeId) !== -1) {
      pidArr.push(route.routeId);
    } else {
      if (pidArr.length) {
        if (pidArr.indexOf(route.pid) !== -1 || pidArr.indexOf(route.routeId) !== -1) {
          pidArr.push(route.routeId);
        } else {
          list.push(route.routeId);
        }
      } else {
        list.push(route.routeId);
      }
    }
  });
  return list;
};


const userRoleList = [
  {
    roleName: "admin",
    roleList: routeList.map(route => {
      return route.routeId;
    })
  },
  {
    roleName: "common",
    roleList: commonRoleList()
  },
];


const userAuthModel = mongoose.model("userAuth", userAuthSchema);

const createRole = async (role) => {
  const hasRole = await userAuthModel.findOne({roleName: role.roleName});
  if (!hasRole) userAuthModel.create(role);
};

userRoleList.forEach(role => {
  createRole(role);
});

module.exports = userAuthModel;