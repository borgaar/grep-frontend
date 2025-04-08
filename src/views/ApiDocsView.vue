<script setup lang="ts">
import { useUserStore } from "@/state/user";
import { ApiReference } from "@scalar/api-reference";
import "@scalar/api-reference/style.css";
import { storeToRefs } from "pinia";
const { theme } = storeToRefs(useUserStore());
</script>

<template>
  <ApiReference :configuration="{ url: '/spec.json', darkMode: theme === 'dark' }" />
</template>
