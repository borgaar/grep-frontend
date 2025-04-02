<script lang="ts" setup>
import ListingThumbnail from "@/components/listing/ListingThumbnail.vue";
import PageContainer from "@/components/PageContainer.vue";
import mockListings from "@/data/mock/listings";
</script>

<template>
  <PageContainer>
    <h1>Listings</h1>
    <div class="listing-grid">
      <ListingThumbnail v-for="listing in mockListings" :key="listing.id" :listing="listing" />
    </div>
  </PageContainer>
</template>

<style scoped>
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  gap: 16px;
  width: 100%;
}
</style>
