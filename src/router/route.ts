import {RouteRecordRaw} from "vue-router";

const Layout = () => import("@/components/layout/index.vue");
const Home = () => import("@/views/home/index.vue");
const Copy = () => import("@/views/functional/clipboard/index.vue");
const Login = () => import("@/components/login/index.vue");
const CountUp = () => import("@/views/functional/countUp/index.vue");
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "/",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                component: Home
            },
            {
                path: "/copy",
                name: "copy",
                component: Copy
            },
            {
                path: "/countUp",
                name: "countUp",
                component: CountUp
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];