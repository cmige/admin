const layout = {
    copyTextSuccess: "Copy succeeded!",
    copyTextError: "Copy failed!",
};

const settingDrawer = {
    settingTitle: "Layout Configuration",

    settingTheme: "Global Themes",
    primary: "Primary",
    darkModel: "Dark Mode",

    topBarSet: "Top Bar Settings",
    topBarBgc: "Top bar background",
    topBarFontColor: "Top bar default font color",

    menuSet: "Menu  Settings",
    menuBgc: "Menu background",
    menuFontColor: "Menu default font color",

    columMenuSet: "Columns Settings",
    columMenuBgc: "Column menu background",
    columMenuFontColor: "Default font color bar menu",

    interfaceSet: "Interface Settings",
    fixHeader: "Fixed header",
    menuHorizontalCollapse: "Menu horizontal collapse",
    menuAccordion: "Menu accordion",
    openLockScreen: "Open the lock screen",
    screenLocking: "screen locking(s/s)",

    interfaceDisplay: "Interface Display",
    sideBarLogo: "Sidebar logo",
    openBreadcrumb: "Open breadcrumb",
    openBreadcrumbIcon: "Open breadcrumb icon",
    openTagsView: "Open tags view",
    openTagsViewIcon: "Open tags view Icon",
    enableTagsViewCache: "Enable tags view cache",
    openFooter: "Open footer",

    otherSet: "Other Settings",
    tagsViewStyle: "Tags view style",

    layoutSet: "Layout Switch",
    layoutSetWarn: "",
    restoreDefault: "restore default"
};

const login = {
    account: "account",
    mobile: "mobile",
    errMsg: {
        isnull: "can not be null",
        lengthErr: "number at least 4, maximum 12",
        verifyErr: "verify code is not match",
        phoneRoleErr: "phone number is illegal, please enter a legal phone number"
    },
    placeholder: {
        account: "place enter your account, default account is admin",
        password: "place enter your password, default password is admin",
        verifyCode: "place enter verify code",
        phone: "place enter your phone number",
        phoneVerifyCode: "place enter your phone verify code"
    }
};


export default {
    layout,
    login,
    settingDrawer
};