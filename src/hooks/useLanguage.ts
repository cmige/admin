import {computed, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, reactive,} from "vue";
import {checkLang, initLang, initMessage, setLang} from "@/utils/other";
import {useThemeConfig} from "@/store/themeConfig";
import {storeToRefs} from "pinia";

const useLanguage = () => {

    const state = reactive({
        locale: ""
    });

    const instance = <any>getCurrentInstance();
    const store = useThemeConfig();
    const {themeConfig} = storeToRefs(store);

    onBeforeMount(() => {
        const storeLang = themeConfig.value.locale;
        const localLang = initLang();
        // 以 pinia 的语言设置为主
        const lang = storeLang || (checkLang(localLang) ? localLang : "zh-cn");

        if (state.locale !== lang) {

            state.locale = lang;
            themeConfig.value.locale = state.locale;
            setLang(state.locale);
        }
    });

    onMounted(() => {
        instance.proxy.mittBus.on("getLanguage", (locale: any) => {
            // setLocal
            setLang(locale);
            // setState => getMessage
            state.locale = locale;
            // setThemeConfig
            themeConfig.value.locale = locale;
        });
    });

    onUnmounted(() => {
        instance.proxy.mittBus.off("getLanguage", () => {
        });
    });

    const getMessage = () => {
        return initMessage()[state.locale];
    };

    const getLanguage = (type: string) => {
        if (type) {
            return computed(() => {
                return getMessage().message[type];
            }).value;
        }
        return getMessage();
    };

    return {
        state,
        getMessage,
        getLanguage
    };
};


export default useLanguage;