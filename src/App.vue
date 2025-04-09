<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <main>
    <NavBar class="navbar" />
    <div class="router-view">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  max-height: 100vh;
  overflow: hidden;
}

.router-view {
  position: relative;
  overflow: auto;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
