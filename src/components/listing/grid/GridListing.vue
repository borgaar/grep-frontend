<script lang="ts" setup>
import mockListings from "@/data/mock/listings";
import ListingThumbnail from "./ListingThumbnail.vue";
</script>

<template>
  <div class="listing-grid">
    <ListingThumbnail v-for="listing in mockListings" :key="listing.id" :listing="listing" />
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
