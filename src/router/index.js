import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Order from "../views/Order.vue";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
    meta: { title: "登录", icon: "dashboard", affix: true },
  },
  {
    path: "/workbench",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/workbench/index"),
        name: "Workbench",
        meta: { title: "工作台", icon: "documentation", affix: true },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    meta: {
      icon: "lock",
      title: "用户管理",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "/home",
        component: Home,
        name: "Home",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
      {
        path: "/about",
        component: About,
        name: "About",
        meta: { title: "简介", icon: "dashboard", affix: true },
      },
      {
        path: "/order",
        component: Order,
        name: "Order",
        meta: { title: "订单", icon: "dashboard", affix: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
