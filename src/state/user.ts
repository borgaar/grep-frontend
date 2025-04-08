// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { i18n } from "../main";
import { authService } from "../api/auth-service";

export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
};

export type UserRole = "admin" | "user";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const theme = ref<"light" | "dark">("light");
  const language = ref<typeof i18n.global.locale.value>("en");
  const role = ref<"admin" | "user">("admin");

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
  }

  function setLanguage(newLanguage: typeof i18n.global.locale.value) {
    i18n.global.locale.value = newLanguage;
    language.value = newLanguage;
  }

  function signOut() {
    user.value = undefined;
    role.value = "user";
    authService.logout();
  }

  return { user, set, theme, toggleTheme, language, setLanguage, role, signOut };
});
