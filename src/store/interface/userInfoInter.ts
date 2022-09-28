export interface UserInfoState {
  userInfo: UserInfos;
}

export interface UserInfos {
  userId: string,
  account: string,
  username: string,
  phone: number | null,
  roles: IRole[]
}


// 请求结果类型
export interface IUserRoleResult {
  account: string
  username: string,
  userId: string,
  roleList: IRole[]
}

export interface IRole {
  routeId: number,
  pid: number,
  path: string,
  name: string,
  title: string,
  icon: string,
  component: string,
  link?: string
}

export interface ILoginResult {
  user: IUser,
  token: string,
  expiration: number
}

interface IUser {
  account: string,
  username: string,
  userRole: string[],
  createTime: Date,
  userId: string
}

export interface IUserList {
  userList: IUser[]
}

interface IUser {
  userId: string,
  account: string,
  username: string,
  userRole: string[],
  createTime: Date
}