<script lang="ts" setup>
import mockListings from "@/data/mock/listings";
import ListingRow from "./ListingRow.vue";
import PageContainer from "@/components/PageContainer.vue";
</script>

<template>
  <PageContainer>
    <div class="listing-list">
      <ListingRow v-for="listing in mockListings" :key="listing.id" :listing="listing" />
    </div>
  </PageContainer>
</template>

<style scoped>
.listing-list {
  display: flex;
  flex-direction: column;
}
</style>
