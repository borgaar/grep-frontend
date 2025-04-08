<script setup lang="ts">
import CategoryFilter from "./CategoryFilter.vue";
import PriceSlider from "./PriceSlider.vue";
import QueryFilter from "./QueryFilter.vue";
</script>

<template>
  <div class="container">
    <div class="query-container">
      <QueryFilter />
    </div>
    <div class="price-range-container">
      <PriceSlider />
    </div>
    <div class="category-container">
      <CategoryFilter />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  row-gap: 20px;
  padding-top: 20px;
  align-items: center;
}

.category-container {
  width: 100%;
  height: min-content;
}

.price-range-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
}
</style>
