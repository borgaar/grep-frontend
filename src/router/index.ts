import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/listings",
      name: "listings",
      component: () => import("../views/ListingsView.vue"),
    },
    {
      path: "/listings/:id",
      name: "listing",
      component: () => import("../views/ListingView.vue"),
    },
  ],
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = localStorage.getItem("Authorization") !== null;

  if (to.name !== "sign-in" && to.name !== "sign-up" && !isAuthenticated) {
    next({ name: "sign-in" });
  } else {
    next();
  }
});

export default router;
