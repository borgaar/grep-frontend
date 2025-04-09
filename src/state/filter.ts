import { defineStore } from "pinia";
import { ref } from "vue";

export type SortDirection = "asc" | "desc";
export type SortingMethod = "price";

export const useFilterStore = defineStore("filter", () => {
  const categories = ref<string[]>([]);
  const priceLower = ref<number | undefined>(undefined);
  const priceUpper = ref<number | undefined>(undefined);
  const query = ref<string | undefined>(undefined);
  const sort = ref<SortDirection | undefined>(undefined);
  const sortingMethod = ref<SortingMethod | undefined>(undefined);
  const page = ref<number>(0);
  const pageSize = ref<number>(10);

  function toggleCategory(category: string) {
    if (categories.value.includes(category)) {
      categories.value = categories.value.filter((cat) => cat !== category);
    } else {
      categories.value.push(category);
    }
  }

  function setPriceLower(newPriceLower: number) {
    priceLower.value = newPriceLower;
  }

  function setPage(newPage: number) {
    page.value = newPage;
  }

  function setPageSize(newPageSize: number) {
    pageSize.value = newPageSize;
  }

  function setPriceUpper(newPriceUpper: number) {
    if (newPriceUpper === 100000) {
      priceUpper.value = undefined;
    } else {
      priceUpper.value = newPriceUpper;
    }
  }

  function setQuery(newQuery: string) {
    query.value = newQuery === "" ? undefined : newQuery;
  }

  function setSortingDirection(newSort: SortDirection | undefined) {
    sort.value = newSort;
  }

  function setSortingMethod(newSortingMethod: SortingMethod | undefined) {
    sortingMethod.value = newSortingMethod;
  }

  function reset() {
    categories.value = [];
    priceLower.value = 0;
    priceUpper.value = undefined;
    query.value = undefined;
    sort.value = undefined;
  }

  return {
    categories,
    priceLower,
    priceUpper,
    query,
    sort,
    page,
    pageSize,
    toggleCategory,
    setPriceLower,
    setSortingMethod,
    sortingMethod,
    setPage,
    setPageSize,
    setPriceUpper,
    setQuery,
    setSortingDirection,
    reset,
  };
});
