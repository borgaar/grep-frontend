import "primeicons/primeicons.css";
import "./assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import { createI18n } from "vue-i18n";
import enMessages from "./locale/en.json";
import noMessages from "./locale/no.json";

const app = createApp(App);

export const i18n = createI18n({
  legacy: false, // Use Composition API
  fallbackLocale: "en",
  messages: {
    en: enMessages,
    no: noMessages,
  },
});
app.use(i18n);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".dark-mode",
    },
  },
});

app.use(ToastService);
app.use(createPinia());
app.use(router);

app.mount("#app");
