import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {dynamicRoutes, staticRoutes} from "@/router/route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {Cookie} from "@/utils/storage";
import {useUserInfo} from "@/store/useUserInfo";


NProgress.configure({
    easing: "ease",
    speed: 1000,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
});

// 路由控制采取后端路由的方式
const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes
});

export default router;

export const addRoute = async (routeList: any) => {
    const list: RouteRecordRaw[] = [];
    const oneRoute = Array.prototype.filter.call(routeList, (route: any) => {
        return route.pid === 0;
    });
    oneRoute.forEach(route => {
        const componentPath = () => import(`../views${route.component}`);
        list.push({
            name: route.name,
            path: route.path,
            component: componentPath,
            meta: {
                routeId: route.route_id
            }
        });
    });
    const secondRoute = Array.prototype.filter.call(routeList, (route: any) => {
        return route.pid !== 0;
    });
    const addSecondRoute = () => {
        secondRoute.forEach(route => {
            const father = list.filter(item => item.meta!.routeId === route.pid)[0];
            if (father) {
                if (!father.children) {
                    father.children = [];
                    const componentPath = () => import(`../views${route.component}`);
                    father.children.push({
                        name: route.name,
                        path: route.path,
                        component: componentPath,
                        meta: {
                            routeId: route.route_id
                        }
                    });
                } else {
                    const componentPath = () => import(`../views${route.component}`);
                    father.children.push({
                        name: route.name,
                        path: route.path,
                        component: componentPath,
                        meta: {
                            routeId: route.route_id
                        }
                    });
                }
            }
        });
    };
    addSecondRoute();
    const dyc = [...dynamicRoutes];
    dyc[0].children = list;
    router.addRoute(dyc[0]);
};

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const token = Cookie.get("token");
    if (!token) {
        if (to.path === "/login") next();
        else {
            // 跳转到 login， 登录后重定向到原来的路径
            Cookie.remove("token");
            next("/login");
        }
    } else {
        if (to.path === "/login") next("/home");
        else {
            // 处理页面刷新的情况
            const userInfoStore = useUserInfo();
            if (!userInfoStore.userInfo.roles.length) {
                try {
                    const userInfo: any = await userInfoStore.getUserInfo();
                    addRoute(userInfo.roles);
                    next({...to, replace: true});
                } catch (err) {
                    // userId 被篡改后导致获取不到权限信息， 需要重新登录再重定向
                    Cookie.remove("token");
                    next("/login");
                }

            } else {
                next();
            }
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});


