import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import type {App} from "vue";

// 语言相关
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import zhCnMsg from "@/language/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import enMsg from "@/language/lang/en";


export function initElIcon(app: App) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
}

export const initLang = (): string => {
    if (!localStorage.getItem("language")) localStorage.setItem("language", "zh-cn");
    return localStorage.getItem("language") as string;
};
export const setLang = (lang: string) => {
    localStorage.removeItem("language");
    localStorage.setItem("language", lang);
};
export const initMessage = () => {
    const message: any = {
        [zhCn.name]: {
            ...zhCn,
            message: zhCnMsg
        },
        [en.name]: {
            ...en,
            message: enMsg
        }
    };
    return message;
};

export const checkLang = (name: string) => {
    const checkList = ["zh-cn", "en"];
    return checkList.indexOf(name) !== -1;
};

const other = {
    elIcon: (app: App) => {
        initElIcon(app);
    },
    initMessage,
    checkLang

};

export default other;