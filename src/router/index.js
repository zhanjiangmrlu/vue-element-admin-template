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
    component: () => import("@/views/login/index"),
    meta: { title: "Dashboard", icon: "dashboard", affix: true },
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/home",
        component: Home,
        name: "Home",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
      {
        path: "/about",
        component: About,
        name: "About",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
      {
        path: "/order",
        component: Order,
        name: "Order",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
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
