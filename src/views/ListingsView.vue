<script lang="ts" setup>
import FilterList from "@/components/listings/FilterList.vue";
import GridListing from "@/components/listings/grid/GridListing.vue";
import ListListings from "@/components/listings/list/ListListings.vue";
import PageContainer from "@/components/PageContainer.vue";
import mockListings from "@/data/mock/listings";
import { ref } from "vue";

const selectedValue = ref("grid");
const viewMethods = ref([
  { icon: "pi pi-th-large", value: "grid" },
  { icon: "pi pi-list", value: "list" },
]);

const listings = ref(mockListings);
</script>

<template>
  <div class="container">
    <FilterList v-model="listings" class="filters" />
    <PageContainer>
      <div class="view-method">
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
      </div>
      <ListListings v-if="selectedValue === 'list'" />
      <GridListing v-if="selectedValue === 'grid'" :listings="listings" />
    </PageContainer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
}

.view-method {
  display: flex;
  justify-content: end;
  padding: 10px;
  height: 60px;
}

.filters {
  position: sticky;
  top: 0;
  width: 300px;
}
</style>
