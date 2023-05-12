import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/redux",
      component: () => import("../views/Redux.vue"),
    },
    {
      path: "/chart",
      component: () => import("../views/Chart.vue"),
    },
    {
      path: "/map",
      component: () => import("../views/Map.vue"),
    },
  ],
});

export default router;
