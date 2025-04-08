// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { i18n } from "../main";
import { authService, type User } from "../api/auth-service";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const theme = ref<"light" | "dark">("light");
  const language = ref<typeof i18n.global.locale.value>("en");

  async function refreshUser() {
    const user = await authService.getUser();
    const lTheme = localStorage.getItem("theme") as "light" | "dark";
    const lLanguage = localStorage.getItem("language") as typeof i18n.global.locale.value;

    if (lTheme) {
      theme.value = lTheme;
      if (lTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    }

    if (lLanguage) {
      i18n.global.locale.value = lLanguage;
      language.value = lLanguage;
    }

    if (user) {
      set(user);
    }
  }

  function set(newUserData: Partial<User>) {
    user.value = {
      ...user.value,
      ...newUserData,
    } as User;
  }

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
    if (theme.value === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme.value);
  }

  function setLanguage(newLanguage: typeof i18n.global.locale.value) {
    i18n.global.locale.value = newLanguage;
    language.value = newLanguage;
    localStorage.setItem("language", newLanguage);
  }

  function signOut() {
    user.value = undefined;
    authService.logout();
  }

  return {
    user,
    set,
    theme,
    toggleTheme,
    language,
    setLanguage,
    signOut,
    ensureInitialized: refreshUser,
  };
});
