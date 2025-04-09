<script lang="ts" setup>
import { CategoryControllerService } from "@/api/services";
import { useUserStore } from "@/state/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import CreateCategoryButton from "./CreateCategoryButton.vue";
import { useI18n } from "vue-i18n";
import { useFilterStore, type Category } from "@/state/filter";
const { t } = useI18n();

const { user } = storeToRefs(useUserStore());
const { toggleCategory } = useFilterStore();
const { categories } = storeToRefs(useFilterStore());

const fetchCategories = async () => {
  try {
    const response = await CategoryControllerService.getAll({ page: 0, pageSize: 5 });

    response.sort((a, b) => a.name.localeCompare(b.name));

    categories.value = response.map((category) => ({
      name: category.name,
      isSelected: false,
    }));
  } catch (error) {
    console.error(t("error-fetching-categories"), error);
  }
};

const deleteCategory = async (category: Category) => {
  try {
    await CategoryControllerService.delete1({ name: category.name });
    categories.value = categories.value.filter((c) => c.name !== category.name);
  } catch (error) {
    console.error(t("error-deleting-category"), error);
  }
  fetchCategories();
};

onMounted(fetchCategories);
</script>

<template>
  <div class="container">
    <h3 class="title">{{ t("categories") }}</h3>
    <div v-for="category in categories" :key="category.name" class="p-field-checkbox">
      <Checkbox :value="category.name" @change="() => toggleCategory(category)" />
      <label class="p-checkbox-label">
        {{ category.name }}
      </label>
      <div style="flex-grow: 1; display: flex; justify-content: end; align-items: center">
        <i style="cursor: pointer" class="pi pi-trash" @click="() => deleteCategory(category)" />
      </div>
    </div>

    <CreateCategoryButton v-if="user?.role === 'admin'" @category-created="fetchCategories" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
}

.title {
  margin-bottom: 2px;
  font-weight: bold;
}

.p-field-checkbox {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
}

.p-checkbox-label {
  margin-left: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

.filter-actions {
  margin-top: 1rem;
}
</style>
