import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// Setup beforeEach hook to check the logged in sync the loggin states with backend
router.beforeEach(async (to, from, next) => {
  // get login state using whomai and axios
  let response = await Vue.axios.get("/api/whoami");
  // response.data is our payload
  store.dispatch("setLoggedInUser", response.data);
  let isLoggedIn = store.state.isLoggedIn;
  // if the name of the router is not Login, it needs authorization to access the page
  if (to.name !== "Login" && !isLoggedIn) {
    // redirect to login page
    next({ name: "Login" });
  } else {
    // otherwise, let go
    next();
  }
});

export default router;
