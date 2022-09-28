import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {dynamicRoutes, staticRoutes} from "@/router/route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {Cookie, Local} from "@/utils/storage";
import {useUserInfo} from "@/store/useUserInfo";
import {markRaw} from "vue";
import {IRole} from "@/store/interface"


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

export const addRoute = async (roleList: IRole[]) => {
  let routerList: RouteRecordRaw[] = [];
  const leaves: RouteRecordRaw[] = [];
  roleList.forEach(role => {
    if (role.pid !== 0) {
      const component = markRaw(() => import(`../views${role.component}`));
      leaves.push({
        name: role.name,
        path: role.link!,
        component: component,
        meta: {
          routeId: role.routeId,
          pid: role.pid,
          title: role.title,
          icon: role.icon,
          link: role.link
        }
      });
    }
  });
  routerList = roleList.reduce((pre: RouteRecordRaw[], next) => {
    if (next.pid === 0) {
      const componentPath = markRaw(() => import(`../views${next.component}`));
      pre.push({
        name: next.name,
        path: next.path,
        component: componentPath,
        meta: {
          routeId: next.routeId,
          pid: next.pid,
          title: next.title,
          icon: next.icon
        }
      });
    }
    return pre;
  }, []);
  formatRouterTree(routerList, leaves);

  Local.set("routerList", routerList)
  const dyc = [...dynamicRoutes];
  dyc[0].children = routerList;
  router.addRoute(dyc[0]);
};


const formatRouterTree = (source: RouteRecordRaw[], children: RouteRecordRaw[]) => {
  const _source: RouteRecordRaw[] = [];
  const leaves: RouteRecordRaw[] = [];
  children.forEach(child => {
    const parent = source.find(c => c.meta!.routeId === child.meta!.pid);
    if (!parent) leaves.push(child);
    else {
      _source.push(child);
      if (!parent.children) parent.children = [];
      parent.children.push(child);
    }
  });
  if (leaves.length && _source.length) {
    formatRouterTree(_source, leaves);
  }
};

router.beforeEach(async (to, from, next) => {

  NProgress.start();
  const token = Cookie.get("token");

  if (!token) {
    if (to.path === "/") next("/login")
    if (to.path === "/login") next();
    else {
      // 跳转到 login， 登录后重定向到原来的路径
      console.log("no token", to.fullPath)
      Cookie.remove("token");
      next({
        path: "/login",
        query: {
          ...to.query,
          redirect: to.fullPath
        },
        params: to.params
      });
    }
  } else {
    if (to.path === "/login") next("/home");
    else {
      // 处理页面刷新的情况
      const userInfoStore = useUserInfo();
      if (!userInfoStore.userInfo.roles.length) {
        try {
          const userInfo: any = await userInfoStore.getUserInfo();
          await addRoute(userInfo.roles);
          next({...to, replace: true});
        } catch (err) {
          // userId 被篡改后导致获取不到权限信息， 需要重新登录再重定向
          Cookie.remove("token");
          next({
            path: "/login",
            query: {
              ...to.query,
              redirect: to.fullPath
            },
            params: to.params,
          });
        }

      } else {
        const redirect = from.query.redirect;
        if (redirect) {
          // console.log("有redirect", from, to);
          if (to.path === redirect) next();
          else next({
            path: redirect as string,
            query: from.redirectedFrom!.query,
            params: from.redirectedFrom!.params
          });
        } else {
          // console.log("没有redirect", from, to);
          next();
        }
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});


