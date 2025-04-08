<script lang="ts" setup>
import FilterList from "@/components/listings/filter/FilterList.vue";
import GridListing from "@/components/listings/grid/GridListing.vue";
import ListListings from "@/components/listings/list/ListListings.vue";
import PageContainer from "@/components/PageContainer.vue";
import mockListings from "@/data/mock/listings";
import router from "@/router";
import { ref } from "vue";

const selectedValue = ref("grid");
const viewMethods = ref([
  { icon: "pi pi-th-large", value: "grid" },
  { icon: "pi pi-list", value: "list" },
]);
const listings = ref(mockListings);
const visible = ref(false);
</script>

<template>
  <div class="container">
    <Sidebar v-model:visible="visible" class="sidebar-content" header="Sidebar">
      <FilterList v-model="listings" />
      <Button label="Apply" class="p-button-text" />
    </Sidebar>

    <FilterList v-model="listings" class="filters" />

    <PageContainer>
      <div class="toolbar">
        <div class="open-filters">
          <Button icon="pi pi-filter" @click="visible = !visible" />
        </div>
        <SelectButton
          v-model="selectedValue"
          :allow-empty="false"
          :options="viewMethods"
          option-value="value"
        >
          <template #option="slotProps">
            <i :class="slotProps.option.icon"></i>
          </template>
        </SelectButton>
        <Button @click="router.push({ name: 'create-listing' })">
          {{ $t("create-listing") }}</Button
        >
      </div>
      <ListListings v-if="selectedValue === 'list'" :listings="listings" />
      <GridListing v-if="selectedValue === 'grid'" :listings="listings" />
    </PageContainer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 60px;
}

.open-filters {
  display: none;
}

@media (max-width: 50rem) {
  .open-filters {
    display: block;
  }
  .filters {
    display: none;
  }
}

.filters {
  position: sticky;
  top: 0;
  width: 300px;
}

.filters-mobile {
  width: 100%;
}
</style>
