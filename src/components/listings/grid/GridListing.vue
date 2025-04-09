<script lang="ts" setup>
import type { ListingDTO } from "@/api/services";
import ListingThumbnail from "./ListingThumbnail.vue";
import mockListings from "@/data/mock/listings";

defineProps<{
  listings: ListingDTO[];
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
  padding-bottom: 15px;
}
</style>
