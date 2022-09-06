const layout = {
    copyTextSuccess: "复制成功!",
    copyTextError: "复制失败!",
};

const settingDrawer = {
    settingTitle: "布局配置",

    settingTheme: "全局主题",
    primary: "基本色",
    darkModel: "深色模式",

    topBarSet: "顶栏设置",
    topBarBgc: "顶栏背景",
    topBarFontColor: "顶栏默认字体颜色",

    menuSet: "菜单设置",
    menuBgc: "菜单背景",
    menuFontColor: "菜单默认字体颜色",

    columMenuSet: "分栏设置",
    columMenuBgc: "分栏菜单背景",
    columMenuFontColor: "分栏菜单默认字体颜色",

    interfaceSet: "界面设置",
    fixHeader: "固定 Header",
    menuHorizontalCollapse: "菜单水平折叠",
    menuAccordion: "菜单手风琴",
    openLockScreen: "开启锁屏",
    screenLocking: "自动锁屏(s/秒)",

    interfaceDisplay: "界面显示",
    sideBarLogo: "侧边栏 Logo",
    openBreadcrumb: "开启 Breadcrumb",
    openBreadcrumbIcon: "开启 Breadcrumb 图标",
    openTagsView: "开启 Tagsview",
    openTagsViewIcon: "开启 Tagsview 图标",
    enableTagsViewCache: "开启 TagsView 缓存",
    openFooter: "开启 Footer",

    otherSet: "其它设置",
    tagsViewStyle: "TagView 风格",

    layoutSet: "布局切换",
    layoutSetWarn: "",
    restoreDefault: "一键恢复默认"
};

const login = {
    account: "帐号登录",
    mobile: "手机登录",
    errMsg: {
        isnull: "不能为空",
        lengthErr: "长度至少为4位,最多为12位",
        verifyErr: "验证码不正确",
        phoneRoleErr: "手机号格式不合法，请输入合法的手机号"
    },
    placeholder: {
        account: "请输入账号，默认账号 admin",
        password: "请输入密码，默认密码 admin",
        verifyCode: "请输入条形验证码",
        phone: "请输入手机号",
        phoneVerifyCode: "请输入验证码"
    }
};


export default {
    layout,
    login,
    settingDrawer
};