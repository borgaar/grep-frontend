<script setup lang="ts">
import mockListings from "@/data/mock/listings";
import type { Listing } from "@/data/types/listings/Listing";
import { useUserStore } from "@/state/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import CreateCategoryButton from "./CreateCategoryButton.vue";

const priceRange = ref([0, 100]);

const listings = defineModel<Listing[]>();

const { role } = storeToRefs(useUserStore());

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
    <Button :onclick="applyFilters">Apply filters</Button>
    <CreateCategoryButton v-if="role === 'admin'" />
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
