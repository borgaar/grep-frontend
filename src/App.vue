<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import { useUserStore } from "./state/user";
const { ensureInitialized } = useUserStore();
ensureInitialized();
</script>

<template>
  <main>
    <NavBar />
    <RouterView class="view" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 100vh;
}

.view {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
