import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "vitestIntro",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "/vitestIntro",
          name: "vitestIntro",
          component: () => import("../views/VitestIntro.vue"),
        },
        {
          path: "/debug",
          name: "debug",
          component: () => import("../views/Debug.vue"),
        },
        {
          path: "/basicGrammar",
          name: "basicGrammar",
          component: () => import("../views/BasicGrammar.vue"),
        },
        {
          path: "/vueTestUtils",
          name: "vueTestUtils",
          component: () => import("../views/VueTestUtils.vue"),
        },
        {
          path: "/other",
          name: "other",
          component: () => import("../views/Other.vue"),
        },
      ],
    },
  ],
});

export default router;
