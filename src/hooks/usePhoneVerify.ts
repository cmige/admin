import {getCurrentInstance, onBeforeUnmount, onMounted, reactive} from "vue";

const verifyCodes = "1234567890";
export const usePhoneVerify = () => {
    const state = reactive({
        verifyCode: "",
        phone: "",
        countDownStart: -1
    });
    const instance = <any>getCurrentInstance();
    onMounted(() => {
        instance.proxy.mittBus.on("getPhoneVerify", (phone: string) => makeVerifyCode(phone));
    });

    onBeforeUnmount(() => {
        instance.proxy.mittBus.off("getPhoneVerify", () => {
        });
    });

    const makeVerifyCode = (phone: string) => {
        state.phone = phone;
        state.countDownStart = Date.now();
        state.verifyCode = "";
        setTimeout(() => {
            state.countDownStart = -1;
        }, 60000);
        makeCode(verifyCodes);

    };

    const makeCode = (source: string, length = 4) => {
        for (let i = 0; i < length; i++) {
            state.verifyCode += verifyCodes[randomNum(0, verifyCodes.length)];
        }
    };

    const randomNum = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const checkCode = (code: string) => {
        const currentTime = Date.now();
        return new Promise((resolve, reject) => {
            if (!code.trim().length) reject(new Error("请输入验证码"));
            if (state.verifyCode !== code.trim()) reject(new Error("验证码不匹配"));
            // if(state.countDownStart === -1){
            //     reject(new Error("验证码已过期"))
            // }
            if (currentTime - state.countDownStart > 63000) reject(new Error("验证码已过期"));
            resolve(true);
        });
    };

    const getCode = () => {
        return Promise.resolve(state.verifyCode);
    };

    return {
        checkCode,
        getCode
    };

};