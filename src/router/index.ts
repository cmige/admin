import {createRouter, createWebHistory} from "vue-router";
import {staticRoutes} from "@/router/route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
    easing: "ease",
    speed: 1000,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
});

const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes
});

export default router;

router.beforeEach(((to, from, next) => {
    NProgress.start();
    next();
}));

router.afterEach(() => {
    NProgress.done();
});