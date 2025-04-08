<script setup lang="ts">
import { useFilterStore } from "@/state/filter";
import { storeToRefs } from "pinia";
import { InputText } from "primevue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { query } = storeToRefs(useFilterStore());
</script>

<template>
  <InputText v-model="query" :placeholder="t('search-by-keyword')" class="w-full" />
</template>
