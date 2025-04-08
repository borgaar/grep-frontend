<script lang="ts" setup>
import { CategoryControllerService, type CategoryDTO } from "@/api/services";
import { useUserStore } from "@/state/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import CreateCategoryButton from "./CreateCategoryButton.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const categories = ref<CategoryDTO[]>([]);
const selectedCategories = ref<CategoryDTO[]>([]);

const { role } = storeToRefs(useUserStore());

const fetchCategories = async () => {
  try {
    const response = await CategoryControllerService.getAll({ page: 0, pageSize: 5 });

    response.sort((a, b) => a.name.localeCompare(b.name));

    categories.value = response;
  } catch (error) {
    console.error(t("error-fetching-categories"), error);
  }
};

const deleteCategory = async (name: string) => {
  try {
    await CategoryControllerService.delete1({ name: name });
    categories.value = categories.value.filter((category) => category.name !== name);
  } catch (error) {
    console.error(t("error-deleting-category"), error);
  }
  fetchCategories();
};

onMounted(fetchCategories);
</script>

<template>
  <div class="category-filter">
    <h3 class="title">{{ t("categories") }}</h3>
    <div v-for="category in categories" :key="category.name" class="p-field-checkbox">
      <Checkbox
        v-model="selectedCategories"
        :input-id="'category_' + category.name"
        :value="category.name"
      />
      <label class="p-checkbox-label">
        {{ category.name }}
      </label>
      <div style="flex-grow: 1; display: flex; justify-content: end; align-items: center">
        <i
          style="cursor: pointer"
          class="pi pi-trash"
          @click="() => deleteCategory(category.name)"
        />
      </div>
    </div>

    <div v-if="selectedCategories.length > 0" class="filter-actions">
      <Button :label="t('clear-filters')" class="p-button-text p-button-sm" />
    </div>
    <CreateCategoryButton v-if="role === 'admin'" @category-created="fetchCategories" />
  </div>
</template>

<style scoped>
.category-filter {
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
