import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./Dashboard.vue";
import Portfolio from "./Portfolio.vue";
import Settings from "./Settings.vue";

const routes = [
	{
		path: "/",
		component: Dashboard,
	},
	{
		path: "/portfolio",
		component: Portfolio,
	},
	{
		path: "/settings",
		component: Settings,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

export default router;
