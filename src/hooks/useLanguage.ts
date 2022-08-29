import {getCurrentInstance, onBeforeMount, onMounted, onUnmounted, reactive,} from "vue";
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
        state.locale = storeLang || (checkLang(localLang) ? localLang : "zh-cn");
        setLang(storeLang);
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

    return {
        state,
        getMessage,
    };
};


export default useLanguage;