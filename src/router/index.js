import { createRouter, createWebHashHistory } from "vue-router";
import AppHomepage from "@/views/AppHomepage.vue";
import ActivityDetail from "@/views/ActivityDetail.vue";
import ContactUs from "@/views/ContactUs.vue";
import AboutUs from "@/views/AboutUs.vue";
import NotFound from "@/views/NotFound.vue";
import HowTo from "@/views/HowTo.vue";
import HourOfAI from "@/views/HourOfAI.vue";

import i18n from "@/i18n";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n";
import SingularActivityDetail from "@/views/SingularActivityDetail.vue";

function getName(key) {
  return () => i18n.global.t("maskinrummet") + " | " + i18n.global.t(key);
}

function getPath(k) {
  return "/:lang(" + LOCALES.join("|") + ")" + k;
}

const routes = [
  { path: "/", redirect: `/${DEFAULT_LOCALE}` },
  {
    path: getPath(""),
    component: AppHomepage,
    name: getName("home"),
  },
  {
    path: getPath("/contact"),
    component: ContactUs,
    name: getName("contact"),
  },
  {
    path: getPath("/about"),
    component: AboutUs,
    name: getName("about"),
  },
  {
    path: getPath("/activity/:id"),
    component: ActivityDetail,
    name: getName("activity"),
  },
  {
    path: getPath("/single-activity/:id/:datasetId?"),
    component: SingularActivityDetail,
    name: getName("activity"),
  },
  {
    path: getPath("/how-to"),
    component: HowTo,
    name: getName("howTo"),
  },
  {
    path: getPath("/hour-of-ai"),
    component: HourOfAI,
    name: getName("hour-of-ai"),
  },
  {
    path: getPath("/:pathMatch(.*)*"),
    component: NotFound,
    name: getName("error404"),
  },
  { path: "/:pathMatch(.*)*", redirect: `/${DEFAULT_LOCALE}/` },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const lang = to.params.lang;
  i18n.global.locale = lang;
  document.title = to.name();
  next();
});

export default router;
