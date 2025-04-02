<script lang="ts" setup>
import GridListing from "@/components/listing/grid/GridListing.vue";
import ListListings from "@/components/listing/list/ListListings.vue";
import PageContainer from "@/components/PageContainer.vue";
import { ref } from "vue";

const selectedValue = ref("grid");
const viewMethods = ref([
  { icon: "pi pi-th-large", value: "grid" },
  { icon: "pi pi-list", value: "list" },
]);
</script>

<template>
  <PageContainer>
    <div class="filters">
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
    <GridListing v-if="selectedValue === 'grid'" />
  </PageContainer>
</template>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
