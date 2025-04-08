<template>
  <div class="card main">
    <Menubar :model="items" class="menubar-full">
      <template v-if="Boolean(user)" #start>
        <div class="user-info">
          <span class="username">{{ user?.firstName + " " + user?.lastName }}</span>
        </div>
      </template>
      <template v-if="Boolean(user)" #item="{ item, props, hasSubmenu, root }">
        <RouterLink v-ripple :to="item.route" class="menu-item" v-bind="props.action">
          <i v-if="item.icon" :class="['menu-icon', item.icon]"></i>
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'badge-non-root': !root, 'badge-root': root }"
            :value="item.badge"
          />
          <span v-if="item.shortcut" class="shortcut">{{ item.shortcut }}</span>
          <i
            v-if="hasSubmenu"
            :class="['pi submenu-icon', { 'pi-angle-down': root, 'pi-angle-right': !root }]"
          ></i>
        </RouterLink>
      </template>
      <template #end>
        <div class="end-container">
          <!-- <Button
            v-tooltip.bottom="'Toggle theme'"
            :icon="theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun'"
            :class="['theme-toggle']"
            @click="toggleTheme"
          /> -->
          <Button
            v-if="Boolean(user)"
            v-tooltip.bottom="'Sign out'"
            icon="pi pi-sign-out"
            variant="text"
            @click="signOut"
          />
          <Button
            v-if="!Boolean(user)"
            v-tooltip.bottom="'Sign in'"
            icon="pi pi-sign-in"
            variant="text"
            @click="signIn"
          />
          <Select
            v-model="language"
            :options="$i18n.availableLocales"
            :option-label="(v) => new Intl.DisplayNames(['en'], { type: 'language' }).of(v)"
            placeholder="Select Language"
            class="language-dropdown"
            @change="(e) => setLanguage(e.value)"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/state/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const { setLanguage, signOut } = useUserStore();
const { user, language } = storeToRefs(useUserStore());

const signIn = () => {
  router.replace({ name: "sign-in" });
};

// Navigation items
const items = ref([
  {
    label: "Listings",
    icon: "pi pi-list",
    route: "/",
  },
  {
    label: "Messages",
    icon: "pi pi-envelope",
    badge: 3,
    route: "/messages",
  },
  {
    label: "Profile",
    icon: "pi pi-user",
    route: "/profile",
  },
  {
    label: "API Docs",
    icon: "pi pi-book",
    route: "/docs",
  },
]);
</script>

<style>
/* Full-width menubar */
.menubar-full {
  width: 100%;
}

/* User info styling */
.user-info {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.username {
  font-weight: bold;
  color: var(--primary-color);
}

/* Menu item styling */
.menu-item {
  display: flex;
  align-items: center;
}

.menu-icon {
  margin-right: 0.5rem;
}

/* Badge positioning */
.badge-non-root {
  margin-left: auto;
}

.badge-root {
  margin-left: 0.5rem;
}

/* Shortcut styling */
.shortcut {
  margin-left: auto;
  border: 1px solid var(--surface-color);
  border-radius: 0.25rem;
  background-color: var(--emphasis-color);
  color: var(--muted-color);
  font-size: 0.75rem;
  padding: 0.25rem;
}

/* Submenu icon positioning */
.submenu-icon {
  margin-left: auto;
}

/* End container styling */
.end-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Theme toggle styling */
.theme-toggle {
  width: 2.5rem;
  height: 2.5rem;
}

.theme-toggle.dark .pi-sun:before {
  content: "\e9c4"; /* PrimeIcons moon icon code */
}

/* Language dropdown styling */
.language-dropdown {
  width: 8rem;
}

/* Media query for responsive elements */
@media (min-width: 640px) {
  .language-dropdown {
    width: 10rem;
  }
}
</style>
