export interface UserInfoState {
    userInfo: UserInfos;
}


export interface UserInfos {
    userId: string,
    account: string,
    username: string,
    phone: number | null,
    roles: any[]
}