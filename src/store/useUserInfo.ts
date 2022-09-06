import {defineStore} from "pinia";
import {UserInfoState} from "@/store/interface";
import require from "@/api";
import API from "@/api/api";
import {Cookie} from "@/utils/storage";

export const useUserInfo = defineStore("userInfo", {
    state: (): UserInfoState => ({
        userInfo: {
            userId: "",
            account: "",
            username: "",
            phone: null,
            roles: []
        }
    }),
    actions: {
        setUserInfo() {

        },
        async getUserInfo() {
            const userId = this.userInfo.userId || localStorage.getItem("userID");
            const result: any = await require.get(API.userInfo, {params: {userId: userId}});
            if (result) {
                this.userInfo.roles = result.routeList;
                return {
                    account: result.account,
                    username: result.username,
                    userId: result.userId,
                    roles: result.routeList
                };
            }
            return result;

        },
        async login(data: { account: string, password: string }) {
            const result: any = await require.post(API.login, data);
            // 保存 token
            if (result) {
                const {user} = result;
                Cookie.set("token", result.token, result.expiration / (60 * 60 * 24));
                // mongoose 对 _id做了特殊处理，如果使用 JSON 进行处理会导致后台查询不到数据
                // 此处不能用封装的 local 函数
                localStorage.setItem("userID", user.userId);
                this.userInfo.username = user.username;
                this.userInfo.account = user.account;
                this.userInfo.userId = user.userId;
            }
            return result;
        }

    }
});