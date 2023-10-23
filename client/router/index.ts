import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import EditRelationshipView from "../views/EditRelationshipView.vue";
import FeedView from "../views/FeedView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MyPostsView from "../views/MyPostsView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import RelationshipView from "../views/RelationshipView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/relationship",
      name: "Relationship",
      component: RelationshipView,
      meta: { requiresAuth: true },
    },
    {
      path: "/relationship/edit",
      name: "Edit Relationship",
      component: EditRelationshipView,
      meta: { requiresAuth: true },
    },
    {
      path: "/my-posts",
      name: "My Posts",
      component: MyPostsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/feed",
      name: "Feed",
      component: FeedView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Home" };
  }
});

export default router;
