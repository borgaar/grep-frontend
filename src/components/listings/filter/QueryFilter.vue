<script setup lang="ts">
import { useFilterStore } from "@/state/filter";
import { storeToRefs } from "pinia";
import { Textarea } from "primevue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { query } = storeToRefs(useFilterStore());
</script>

<template>
  <Textarea v-model="query" auto-resize :placeholder="t('search-by-keyword')" class="input" />
</template>

<style scoped>
.input {
  width: 100%;
}
</style>
