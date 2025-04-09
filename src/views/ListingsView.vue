<script lang="ts" setup>
import { ListingControllerService, type ListingDTO } from "@/api/services";
import FilterList from "@/components/listings/filter/FilterList.vue";
import GridListing from "@/components/listings/grid/GridListing.vue";
import ListListings from "@/components/listings/list/ListListings.vue";
import PageContainer from "@/components/PageContainer.vue";
import router from "@/router";
import { useFilterStore, type SortDirection, type SortingMethod } from "@/state/filter";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const selectedValue = ref("grid");
const viewMethods = ref([
  { icon: "pi pi-th-large", value: "grid" },
  { icon: "pi pi-list", value: "list" },
]);
const listings = ref<ListingDTO[]>([]);

const filters = storeToRefs(useFilterStore());

const { setSortingDirection, setSortingMethod, setPage, setPageSize } = useFilterStore();

const fetchListings = async () => {
  try {
    const response = await ListingControllerService.getPaginated({
      page: filters.page.value,
      size: filters.pageSize.value,
      priceLower: filters.priceLower.value,
      priceUpper: filters.priceUpper.value,
      sortDirection: filters.sort.value,
      sort: filters.sortingMethod.value,
      categories: filters.categories.value
        .filter((c) => c.isSelected)
        .map((category) => category.name),
      query: filters.query.value,
    });
    if (response.length === 0) {
      console.warn("No listings found");
    }
    listings.value = response;
    console.log("Fetched listings:", listings.value.length);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};

watch(() => filters, fetchListings, { deep: true });

const sortingDirections: { label: string; value: SortDirection }[] = [
  {
    label: "Ascending price",
    value: "asc",
  },
  {
    label: "Descending price",
    value: "desc",
  },
];

const sortingMethods: { label: string; value: SortingMethod }[] = [
  {
    label: t("price"),
    value: "price",
  },
];

const selectedSortingDirection = ref<(typeof sortingDirections)[0]>(sortingDirections[0]);
const selectedSortingMethod = ref<(typeof sortingMethods)[0] | null>(null);

onMounted(fetchListings);

const visible = ref(false);
</script>

<template>
  <div class="container">
    <Sidebar v-model:visible="visible" class="sidebar">
      <FilterList v-model="listings" class="sidebar-filters" />
    </Sidebar>

    <FilterList v-model="listings" :on-apply="fetchListings" class="filters" />

    <PageContainer>
      <div class="toolbar">
        <div class="view-methods">
          <div class="open-filters">
            <Button icon="pi pi-filter" @click="visible = !visible" />
          </div>
          <SelectButton
            v-model="selectedValue"
            :allow-empty="false"
            :options="viewMethods"
            option-value="value"
            style="height: 100%"
          >
            <template #option="slotProps">
              <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
          <Dropdown
            v-model="selectedSortingMethod"
            :options="sortingMethods"
            option-label="label"
            placeholder="Sort by"
            show-clear
            checkmark
            :highlight-on-select="false"
            @change="
              () => {
                if (selectedSortingMethod) {
                  setSortingDirection(sortingDirections[0].value);
                } else {
                  setSortingDirection(undefined);
                }
                setSortingMethod(selectedSortingMethod?.value);
              }
            "
          />
          <Dropdown
            v-if="selectedSortingMethod !== null"
            v-model="selectedSortingDirection"
            :options="sortingDirections"
            option-label="label"
            placeholder="Sort direction"
            checkmark
            :highlight-on-select="false"
            @change="() => setSortingDirection(selectedSortingDirection?.value)"
          />
        </div>
        <Button @click="router.push({ name: 'create-listing' })">
          {{ $t("create-listing") }}</Button
        >
      </div>
      <ListListings v-if="selectedValue === 'list'" :listings="listings" />
      <GridListing v-if="selectedValue === 'grid'" :listings="listings" />
      <Paginator
        :rows="filters.pageSize.value"
        :total-records="listings.length"
        :rows-per-page-options="[10, 20, 30]"
        @page="
          (e) => {
            setPage(e.page);
            setPageSize(e.rows);
          }
        "
      ></Paginator>
    </PageContainer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: min-content;
  justify-content: center;
  align-items: start;
  padding-inline: 10px;
}

.sidebar {
  width: 430px;
  height: 100%;
  z-index: 1000;
}

.sidebar-filters {
  width: 100%;
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

.view-methods {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filters {
  position: sticky;
  top: 0;
  width: 30rem;
  max-width: 300px;
}
</style>
