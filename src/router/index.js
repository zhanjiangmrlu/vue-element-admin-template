import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
import User from "../views/system/user/index.vue";
import Log from "../views/system/log/index.vue";
import Attack from "../views/system/attack/index.vue";

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
    path: "/system",
    component: Layout,
    meta: {
      icon: "lock",
      title: "系统管理",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "/system/user",
        component: User,
        name: "User",
        meta: { title: "用户管理", affix: true },
      },
      {
        path: "/system/log",
        component: Log,
        name: "Log",
        meta: { title: "操作日志", affix: true },
      },
      {
        path: "/system/attack",
        component: Attack,
        name: "Attack",
        meta: { title: "攻击态势报告", affix: true },
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
