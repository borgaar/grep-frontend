<script setup lang="ts">
import mockListings from "@/data/mock/listings";
import type { Listing } from "@/data/types/listings/Listing";
import { ref } from "vue";

const priceRange = ref([0, 100]);

const listings = defineModel<Listing[]>();

const applyFilters = () => {
  // Filter by price range
  listings.value = mockListings.filter((listing) => {
    const price = listing.price;
    const maxPrice = priceRange.value[1] * 100;
    const minPrice = priceRange.value[0] * 100;
    return price >= minPrice && price <= maxPrice;
  });
};
</script>

<template>
  <div class="container">
    <div class="price-range">
      <p>{{ priceRange[0] * 100 }}kr - {{ priceRange[1] * 100 }}kr</p>
      <Slider v-model="priceRange" range class="price-range-slider" />
    </div>
    <Button class="apply-button" :disabled="priceRange[0] === priceRange[1]" @click="applyFilters"
      >Apply</Button
    >
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  row-gap: 20px;
  padding-block: 20px;
}

.price-range {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
}

.price-range-slider {
  width: 80%;
  margin-inline: auto;
}

.apply-button {
  margin: 10px auto;
  width: 80%;
}
</style>
