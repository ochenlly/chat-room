import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/room",
    component: () => import("../pages/ChatRoom.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
