import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { addMessages, setI18nLanguage } from "@/i18n";
import RouterView from "./RouterView";

const routes = [
  {
    path: "/",
    redirect: `/en`,
  },

  {
    path: "/:locale",
    component: RouterView,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          loadTranslation: (locale) =>
            import(
              /* webpackChunkName: "lang-[request]" */ `./home-translation/${locale}.js`
            ),
        },
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          loadTranslation: (locale) =>
            import(
              /* webpackChunkName: "lang-[request]" */ `./about-translation/${locale}.js`
            ),
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.loadTranslation) {
    const messages = await to.meta.loadTranslation("en");
    await addMessages(to.params.locale, messages.default);
    setI18nLanguage(to.params.locale);
  }

  next();
});

export default router;
