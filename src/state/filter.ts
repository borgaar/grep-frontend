import { defineStore } from "pinia";
import { ref } from "vue";

export type SortingMethod = "asc" | "desc";

export const useFilterStore = defineStore("filter", () => {
  const categories = ref<string[]>([]);
  const priceLower = ref<number | undefined>(undefined);
  const priceUpper = ref<number | undefined>(undefined);
  const query = ref<string | undefined>(undefined);
  const sort = ref<SortingMethod | undefined>(undefined);

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

  function setSort(newSort: SortingMethod | undefined) {
    sort.value = newSort;
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
    toggleCategory,
    setPriceLower,
    setPriceUpper,
    setQuery,
    setSort,
    reset,
  };
});
