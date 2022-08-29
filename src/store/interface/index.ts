export interface ThemeConfigStates {
    locale: string,
    layout: string,
    showSettingDrawer: boolean,
    // setting
    primary: string,
    isDark: boolean,
    topBarBgc: string,
    topBarFontColor: string,
    menuBgc: string,
    menuFontColor: string,
    columMenuBgc: string,
    columMenuFontColor: string,
    isFixedHeader: boolean,
    isCollapse: boolean,
    menuAccordion: boolean,
    isLocking: boolean,
    lockingTime: number,
    hasLogo: boolean,
    hasBreadcrumb: boolean,
    hasBreadcrumbIcon: boolean,
    hasTagsView: boolean,
    hasTagsViewIcon: boolean,
    isTagsViewCache: boolean,
    hasFooter: boolean,
    tagsViewStyle: string
}

export interface ThemeConfig {
    themeConfig: ThemeConfigStates;
}