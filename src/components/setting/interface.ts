export const enum SettingItemType {
    Switch,
    Picker,
    InputNumber
}

const primary = "primary";
const darkModel = "darkModel";
const topBarBgc = "topBarBgc";
const topBarFontColor = "topBarFontColor";
const menuBgc = "menuBgc";
const menuFontColor = "menuFontColor";
const columMenuBgc = "columMenuBgc";
const columMenuFontColor = "columMenuFontColor";
const fixHeader = "fixHeader";
const menuHorizontalCollapse = "menuHorizontalCollapse";
const menuAccordion = "menuAccordion";
const openLockScreen = "openLockScreen";
const screenLocking = "screenLocking";
const sideBarLogo = "sideBarLogo";
const openBreadcrumb = "openBreadcrumb";
const openBreadcrumbIcon = "openBreadcrumbIcon";
const openTagsView = "openTagsView";
const openTagsViewIcon = "openTagsViewIcon";
const enableTagsViewCache = "enableTagsViewCache";
const openFooter = "openFooter";
const tagsViewStyle = "tagsViewStyle";

export const SettingPropertiesObj = {
    primary,
    darkModel,
    topBarBgc,
    topBarFontColor,
    menuBgc,
    menuFontColor,
    columMenuBgc,
    columMenuFontColor,
    fixHeader,
    menuHorizontalCollapse,
    menuAccordion,
    openLockScreen,
    screenLocking,
    sideBarLogo,
    openBreadcrumb,
    openBreadcrumbIcon,
    openTagsView,
    openTagsViewIcon,
    enableTagsViewCache,
    openFooter,
    tagsViewStyle
};

export const settingToThemeStoreMap = {
    [SettingPropertiesObj.primary]: "primary",
    [SettingPropertiesObj.darkModel]: "isDark",
    [SettingPropertiesObj.topBarBgc]: "topBarBgc",
    [SettingPropertiesObj.topBarFontColor]: "topBarFontColor",
    [SettingPropertiesObj.menuBgc]: "menuBgc",
    [SettingPropertiesObj.menuFontColor]: "menuFontColor",
    [SettingPropertiesObj.columMenuBgc]: "columMenuBgc",
    [SettingPropertiesObj.columMenuFontColor]: "columMenuFontColor",
    [SettingPropertiesObj.fixHeader]: "isFixedHeader",
    [SettingPropertiesObj.menuHorizontalCollapse]: "isCollapse",
    [SettingPropertiesObj.menuAccordion]: "menuAccordion",
    [SettingPropertiesObj.openLockScreen]: "isLocking",
    [SettingPropertiesObj.screenLocking]: "lockingTime",
    [SettingPropertiesObj.sideBarLogo]: "hasLogo",
    [SettingPropertiesObj.openBreadcrumb]: "hasBreadcrumb",
    [SettingPropertiesObj.openBreadcrumbIcon]: "hasBreadcrumbIcon",
    [SettingPropertiesObj.openTagsView]: "hasTagsView",
    [SettingPropertiesObj.openTagsViewIcon]: "hasTagsViewIcon",
    [SettingPropertiesObj.enableTagsViewCache]: "isTagsViewCache",
    [SettingPropertiesObj.openFooter]: "hasFooter",
    [SettingPropertiesObj.tagsViewStyle]: "tagsViewStyle",
};