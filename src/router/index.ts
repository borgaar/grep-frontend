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
      path: "/listing/:id",
      name: "listing",
      component: () => import("../views/ListingView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/MessagesView.vue"),
    },
    {
      path: "/docs",
      name: "docs",
      component: () => import("../views/ApiDocsView.vue"),
    },
  ],
});

router.beforeEach((to, _, next) => {
  // TODO remove sockets
  if (to.name !== "sign-in" && to.name !== "sign-up" && !authService.isAuthenticated()) {
    next({ name: "sign-in" });
  } else {
    next();
  }
});

export default router;
