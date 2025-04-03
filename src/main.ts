import "primeicons/primeicons.css";
import "./assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";

const app = createApp(App);

import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "no",
  fallbackLocale: "en",
});
app.use(i18n);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(ToastService);
app.use(createPinia());
app.use(router);

app.mount("#app");
