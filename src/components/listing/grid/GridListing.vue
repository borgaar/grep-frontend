<script lang="ts" setup>
import ListingThumbnail from "./ListingThumbnail.vue";
import type { Listing } from "@/data/types/listings/Listing";

defineProps<{
  listings: Listing[];
}>();
</script>

<template>
  <div class="listing-grid">
    <ListingThumbnail v-for="listing in listings" :key="listing.id" :listing="listing" />
  </div>
</template>

<style scoped>
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 400px;
  gap: 16px;
  width: 100%;
}
</style>
