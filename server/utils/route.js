const routeList = [
  {
    routeId: 1,
    pid: 0,
    path: "/home",
    name: "Home",
    title: "Home",
    icon: "HomeFilled",
    component: "/home/index.vue"
  },
  {
    routeId: 2,
    pid: 0,
    path: "/products",
    name: "Products",
    title: "products-management",
    icon: "",
    component: "/products/index.vue"
  },
  {
    routeId: 3,
    pid: 0,
    path: "/role",
    name: "Role",
    title: "role-management",
    icon: "",
    component: "/role/index.vue"
  },
  {
    routeId: 4,
    pid: 0,
    path: "/user",
    name: "User",
    title: "user-management",
    icon: "",
    component: "/user/index.vue"
  },
  {
    routeId: 5,
    pid: 0,
    path: "/order",
    name: "Order",
    title: "order-management",
    icon: "",
    component: "/order/index.vue"
  },
  {
    routeId: 6,
    pid: 0,
    path: "/personal",
    name: "Personal",
    title: "personal-management",
    icon: "",
    component: "/personal/index.vue"
  },
  {
    routeId: 7,
    pid: 0,
    path: "/fun",
    name: "Function",
    title: "function-management",
    icon: "",
    component: "/functional/index.vue"
  },
  {
    routeId: 8,
    pid: 0,
    path: "/system",
    name: "systemSetting",
    title: "system-management",
    icon: "Setting",
    component: "/system/index.vue"
  },
  {
    routeId: 9,
    pid: 0,
    path: "/charts",
    name: "Charts",
    title: "charts-management",
    icon: "",
    component: "/charts/index.vue"
  },
  {
    routeId: 10,
    pid: 2,
    path: "/category",
    name: "Category",
    title: "category-management",
    icon: "",
    link: "/products/category",
    component: "/products/category/index.vue"
  },
  {
    routeId: 11,
    pid: 2,
    path: "/commodity",
    name: "Commodity",
    title: "commodity-management",
    icon: "",
    link: "/products/commodity",
    component: "/products/commodity/index.vue"
  },
];

module.exports = routeList;