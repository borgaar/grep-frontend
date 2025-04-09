<script setup lang="ts">
import CategoryFilter from "./CategoryFilter.vue";
import PriceRangeFilter from "./PriceRangeFilter.vue";
import QueryFilter from "./QueryFilter.vue";
</script>

<template>
  <div class="container">
    <div class="query-container">
      <QueryFilter />
    </div>
    <div class="price-range-container">
      <PriceRangeFilter />
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
  row-gap: 20px;
  margin-top: 10px;
  align-items: center;
}

.category-container {
  width: 100%;
  height: min-content;
}

.query-container {
  width: 100%;
}

.price-range-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
}
</style>
