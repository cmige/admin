import {defineStore} from "pinia";
import {ThemeConfig, ThemeConfigStates} from "@/store/interface";


export const useThemeConfig = defineStore("themeConfig", {
    state: (): ThemeConfig => ({
        themeConfig: {
            ...defaultConfig
        }
    }),
    actions: {
        setThemeConfig(data: ThemeConfigStates) {
            this.themeConfig = data;
        }
    }
});

const defaultConfig = {
    locale: "",
    layout: "default",
    showSettingDrawer: false,
    primary: "#bbffcc",
    isDark: false,
    topBarBgc: "",
    topBarFontColor: "",
    menuBgc: "",
    menuFontColor: "",
    columMenuBgc: "",
    columMenuFontColor: "",
    isFixedHeader: false,
    isCollapse: false,
    menuAccordion: false,
    isLocking: false,
    lockingTime: 30,
    hasLogo: false,
    hasBreadcrumb: true,
    hasBreadcrumbIcon: false,
    hasTagsView: true,
    hasTagsViewIcon: false,
    isTagsViewCache: false,
    hasFooter: false,
    tagsViewStyle: "",
};
