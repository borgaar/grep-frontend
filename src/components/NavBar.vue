<template>
  <div class="card main">
    <Menubar :model="items" class="menubar-full">
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="menu-item" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'badge-non-root': !root, 'badge-root': root }"
            :value="item.badge"
          />
          <span v-if="item.shortcut" class="shortcut">{{ item.shortcut }}</span>
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down submenu-icon',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="end-container">
          <InputText placeholder="Search" type="text" class="search-input" />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    badge: 3,
    items: [
      {
        label: "Core",
        icon: "pi pi-bolt",
        shortcut: "⌘+S",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
        shortcut: "⌘+B",
      },
      {
        separator: true,
      },
      {
        label: "UI Kit",
        icon: "pi pi-pencil",
        shortcut: "⌘+U",
      },
    ],
  },
]);
</script>

<style>
/* Full-width menubar */
.menubar-full {
  width: 100%;
}

/* Menu item styling */
.menu-item {
  display: flex;
  align-items: center;
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
  gap: 0.5rem;
}

/* Search input styling */
.search-input {
  width: 8rem;
}

/* Media query for responsive search input */
@media (min-width: 640px) {
  .search-input {
    width: auto;
  }
}
</style>
