import { createApp } from "vue";
import PrimeVue from "primevue/config";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import App from "./App.vue";
import "primevue/resources/themes/lara-light-purple/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";

import globalComponents from "./globalComponents";

const app = createApp(App);
app.use(PrimeVue);
app.use(i18n);
app.use(router);
app.use(store);

Object.entries(globalComponents).forEach(([name, component]) => {
  app.component(name, component);
});

router.beforeEach((to, from, next) => {
  document.title = to.name();
  next();
});

app.mount("#app");
