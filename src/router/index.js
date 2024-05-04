import { createRouter, createWebHashHistory } from "vue-router";
import AppHomepage from "@/views/AppHomepage.vue";
import ActivityDetail from "@/views/ActivityDetail.vue";
import ContactUs from "@/views/ContactUs.vue";
import AboutUs from "@/views/AboutUs.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  { path: "/", component: AppHomepage },
  { path: "/contact", component: ContactUs },
  { path: "/about", component: AboutUs },
  { path: "/activity", component: ActivityDetail },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
