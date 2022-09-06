const routeList = [
	{
		route_id: 1,
		pid: 0,
		path: "/home",
		name: "Home",
		title: "Home",
		icon: "HomeFilled",
		component: "/home/index.vue"
	},
	{
		route_id: 2,
		pid: 0,
		path: "/products",
		name: "Products",
		title: "products-management",
		icon: "",
		component: "/products/index.vue"
	},
	{
		route_id: 3,
		pid: 0,
		path: "/role",
		name: "Role",
		title: "role-management",
		icon: "",
		component: "/role/index.vue"
	},
	{
		route_id: 4,
		pid: 0,
		path: "/user",
		name: "User",
		title: "user-management",
		icon: "",
		component: "/user/index.vue"
	},
	{
		route_id: 5,
		pid: 0,
		path: "/order",
		name: "Order",
		title: "order-management",
		icon: "",
		component: "/order/index.vue"
	},
	{
		route_id: 6,
		pid: 0,
		path: "/personal",
		name: "Personal",
		title: "personal-management",
		icon: "",
		component: "/personal/index.vue"
	},
	{
		route_id: 7,
		pid: 0,
		path: "/fun",
		name: "Function",
		title: "function-management",
		icon: "",
		component: "/function/index.vue"
	},
	{
		route_id: 8,
		pid: 0,
		path: "/setting",
		name: "Setting",
		title: "setting-management",
		icon: "Setting",
		component: "/setting/index.vue"
	},
	{
		route_id: 9,
		pid: 0,
		path: "/charts",
		name: "Charts",
		title: "charts-management",
		icon: "",
		component: "/charts/index.vue"
	},
	{
		route_id: 10,
		pid: 2,
		path: "/category",
		name: "Category",
		title: "category-management",
		icon: "",
		link: "/products/category",
		component: "/products/category/index.vue"
	},
	{
		route_id: 11,
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