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
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
}

.category-container {
  width: 100%;
  row-gap: 10px;
  padding-block: 20px;
}

.query-container {
  width: 100%;
}

.price-range-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding-block: 20px;
  width: 100%;
}
</style>
