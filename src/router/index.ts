import { createRouter, createWebHistory } from "vue-router";
import { authService } from "@/api/auth-service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: "/",
      name: "listings",
      component: () => import("../views/ListingsView.vue"),
    },
    {
      path: "/:id",
      name: "listing",
      component: () => import("../views/ListingView.vue"),
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.name !== "sign-in" && to.name !== "sign-up" && !authService.isAuthenticated()) {
    next({ name: "sign-in" });
  } else {
    next();
  }
});

export default router;
