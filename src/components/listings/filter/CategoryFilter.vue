<script lang="ts" setup>
import { CategoryControllerService, type CategoryResponse } from "@/api/services";
import { onMounted, ref } from "vue";

const categories = ref<CategoryResponse[]>([]);
const selectedCategories = ref<CategoryResponse[]>([]);

onMounted(async () => {
  try {
    const response = await CategoryControllerService.getAll({ page: 0, pageSize: 5 });

    console.log("Categories:", response);

    categories.value = response;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>

<template>
  <div class="category-filter">
    <h3>Categories</h3>
    <div v-for="category in categories" :key="category.name" class="p-field-checkbox">
      <Checkbox
        v-model="selectedCategories"
        :input-id="'category_' + category.name"
        :value="category.name"
      />
      <label :for="'category_' + category.name" class="p-checkbox-label">
        {{ category.name }}
      </label>
    </div>

    <div v-if="selectedCategories.length > 0" class="filter-actions">
      <Button label="Clear Filters" class="p-button-text p-button-sm" />
    </div>
  </div>
</template>

<style scoped>
.category-filter {
  margin-bottom: 1.5rem;
}

.p-field-checkbox {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.p-checkbox-label {
  margin-left: 0.5rem;
}

.filter-actions {
  margin-top: 1rem;
}
</style>
