import {RouteRecordRaw} from "vue-router";

const Layout = () => import("@/components/layout/index.vue");
const Home = () => import("@/views/home/index.vue");
const Login = () => import("@/views/login/index.vue");

// Business
const ProductManage = () => import("@/views/products/index.vue");
const RoleManage = () => import("@/views/role/index.vue");
const UserManage = () => import("@/views/user/index.vue");
const OrderManage = () => import("@/views/order/index.vue");

// functional
const CountUp = () => import("@/views/functional/countUp/index.vue");
const Copy = () => import("@/views/functional/clipboard/index.vue");


export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "/",
        redirect: "/home",
        component: Layout,
        children: []
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];


export const dynamicRoutes: Array<RouteRecordRaw> = [
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
                path: "/products",
                name: "productManage",
                component: ProductManage
            },
            {
                path: "/role",
                name: "roleManage",
                component: RoleManage
            },
            {
                path: "/user",
                name: "userManage",
                component: UserManage
            },
            {
                path: "/order",
                name: "orderManage",
                component: OrderManage
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
            },
        ]
    },
];