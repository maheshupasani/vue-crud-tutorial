import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/users",
    name: "users",
    component: () => import("../views/users/UsersList")
  },
  {
    path: "/users/:id",
    name: "users-details",
    component: () => import("../views/users/UsersDetails")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../views/users/AddUser")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
