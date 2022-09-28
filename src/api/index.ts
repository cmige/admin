import request from './http'
import API from "@/api/api";


interface IUserInfo {
  account: string,
  password: string,
  phone?: number,
  email?: string,
  role?: string
}

interface IRoleInfo {
  roleName: string,
  roleList: string[],
  authName: string
}

export const addUser = (userInfo: IUserInfo) => request.post(API.register, userInfo)

export const getUserList = () => request.get(API.userList)

export const getRoleList = () => request.get(API.roleList)

export const addRole = (roleInfo: IRoleInfo) => request.post(API.addRole, {roleInfo})


