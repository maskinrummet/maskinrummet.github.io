import { createRouter, createWebHashHistory } from "vue-router";
import AppHomepage from "@/views/AppHomepage.vue";
import ActivityDetail from "@/views/ActivityDetail.vue";
import ContactUs from "@/views/ContactUs.vue";
import AboutUs from "@/views/AboutUs.vue";
import NotFound from "@/views/NotFound.vue";
import HowTo from "@/views/HowTo.vue";
import i18n from "@/i18n";

function getName(key) {
  return () => i18n.global.t("maskinrummet") + " | " + i18n.global.t(key);
}

const routes = [
  { path: "/", component: AppHomepage, name: getName("home") },
  { path: "/contact", component: ContactUs, name: getName("contact") },
  { path: "/about", component: AboutUs, name: getName("about") },
  { path: "/activity", component: ActivityDetail, name: getName("activity") },
  { path: "/how-to", component: HowTo, name: getName("howTo") },
  { path: "/:pathMatch(.*)*", component: NotFound, name: getName("error404") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
