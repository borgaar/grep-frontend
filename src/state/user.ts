// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { i18n } from "../main";

type User = {
  firstName: string;
  lastName: string;
  phone: string;
};

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const theme = ref<"light" | "dark">("light");
  const language = ref<typeof i18n.global.locale.value>("en");

  function set(newUser: User) {
    user.value = newUser;
  }

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
    if (theme.value === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }

  function setLanguage(newLanguage: typeof i18n.global.locale.value) {
    i18n.global.locale.value = newLanguage;
    language.value = newLanguage;
  }

  return { user, set, theme, toggleTheme, language, setLanguage };
});
