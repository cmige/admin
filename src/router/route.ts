import {RouteRecordRaw} from "vue-router";

const Layout = () => import("@/components/layout/index.vue");
const Home = () => import("@/views/home/index.vue");
const Login = () => import("@/views/login/index.vue");

// Business
const ProductManage = () => import("@/views/products/index.vue");
const RoleManage = () => import("@/views/role/index.vue");
const UserManage = () => import("@/views/user/index.vue");
const OrderManage = () => import("@/views/order/index.vue");
const SystemManage = () => import("@/views/system/index.vue")
const Personal = () => import("@/views/personal/index.vue")
const Charts = () => import("@/views/charts/index.vue")
const Function = () => import("@/views/functional/index.vue")
const Category = () => import("@/views/products/category/index.vue")
const Commodity = () => import("@/views/products/commodity/index.vue")
// functional
const CountUp = () => import("@/views/functional/countUp/index.vue");
const Copy = () => import("@/views/functional/clipboard/index.vue");


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
        component: ProductManage,
        redirect: '/products/category',
        children: [
          {
            path: '/products/category',
            name: "Category",
            component: Category
          },
          {
            path: '/products/commodity',
            name: "Commodity",
            component: Commodity
          }
        ]
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
        path: "/personal",
        name: "Personal",
        component: Personal
      },
      {
        path: "/fun",
        name: "Function",
        component: Function
      },
      {
        path: "/system",
        name: "System",
        component: SystemManage
      },
      {
        path: "/charts",
        name: "Charts",
        component: Charts
      },
    ]
  },
];

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    component: Layout
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }

];


