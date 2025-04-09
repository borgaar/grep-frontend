<script lang="ts" setup>
import { CategoryControllerService, ListingControllerService } from "@/api/services";
import router from "@/router";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { nextTick, onMounted, ref, useTemplateRef } from "vue";
import { z } from "zod";
import { useI18n } from "vue-i18n";
import { GeoNorge, type Address } from "@/api/geo-norge";
import { useRoute } from "vue-router";
const { t } = useI18n();
const route = useRoute();

import { Form, type FormInstance } from "@primevue/forms";

const formRef = useTemplateRef<FormInstance>("formRef");

const categories = ref<string[]>([]);
const addressSearch = ref("");
const addressSuggestions = ref<Address[]>([]);
const selectedAddress = ref<Address | null>(null);

const initialValues = ref();

onMounted(async () => {
  categories.value = (
    await CategoryControllerService.getAll({
      page: 0,
      pageSize: 100,
    })
  ).map((category) => category.name);

  const existing = await ListingControllerService.get({
    id: route.params.id as string,
  });

  initialValues.value = {
    title: existing.title,
    description: existing.description,
    price: existing.price,
    categoryName: existing.category.name,
    location: { lat: existing.location.lat, lon: existing.location.lon },
  };

  await nextTick();
});

const searchAddress = async (event: { query: string }) => {
  if (event.query.trim().length > 2) {
    try {
      const response = await GeoNorge.search(event.query);
      addressSuggestions.value = response.adresser.map((address) => ({
        ...address,
        displayText: `${address.postnummer} ${address.poststed}`,
      }));
    } catch (error) {
      console.error(t("error-searching-for-address"), error);
      addressSuggestions.value = [];
    }
  }
};

const selectAddress = (event: { value: Address }) => {
  selectedAddress.value = event.value;

  if (event.value.representasjonspunkt) {
    formRef.value?.setFieldValue("location", event.value.representasjonspunkt);
  }
};

const onFormSubmit = async ({ valid, values }: { valid: boolean; values: any }) => {
  const newValues = {
    ...initialValues.value,
  };

  Object.entries(values).map(([key, value]) => {
    if (value !== null) {
      newValues[key] = value;
    }
  });

  await ListingControllerService.update({
    id: route.params.id as string,
    requestBody: {
      title: newValues.title,
      description: newValues.description,
      price: newValues.price!,
      category: newValues.categoryName,
      location: {
        lat: newValues.location.lat,
        lon: newValues.location.lon,
      },
      bookmarked: false,
    },
  });

  router.back();
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>{{ t("edit-listing") }}</h2>
      <Form v-slot="$form" ref="formRef" :initial-values @submit="onFormSubmit as any">
        <div class="p-fluid">
          <div class="field">
            <label for="title">{{ t("title") }}</label>
            <InputText name="title" type="text" required fluid />
            <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
              $form.title.error?.message
            }}</Message>
          </div>

          <div class="field">
            <label for="description">{{ t("description") }}</label>
            <Textarea name="description" auto-resize rows="5" required />
            <Message
              v-if="$form.description?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.description.error?.message }}</Message
            >
          </div>

          <div class="field">
            <label for="price">{{ t("price") }}</label>
            <InputNumber name="price" mode="currency" currency="NOK" required />
            <Message v-if="$form.price?.invalid" severity="error" size="small" variant="simple">{{
              $form.price.error?.message
            }}</Message>
          </div>

          <div class="field">
            <label for="category">{{ t("category") }}</label>
            <Dropdown
              id="category"
              :options="categories"
              :placeholder="t('select-a-category')"
              name="categoryName"
              required
            />
            <Message
              v-if="$form.categoryName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.categoryName.error?.message }}</Message
            >
          </div>

          <div class="field">
            <label for="address">{{ t("address") }}</label>
            <AutoComplete
              v-model="addressSearch"
              name="address"
              :suggestions="addressSuggestions"
              :placeholder="t('search-for-an-address')"
              option-label="adressetekst"
              :delay="500"
              field="displayText"
              @complete="searchAddress"
              @item-select="selectAddress"
            />
            <small class="address-details">
              {{ t("address-is-persisted") }}
            </small>
            <small v-if="selectedAddress" class="address-details">
              <i class="pi pi-map-marker" />
              {{ selectedAddress.adressetekst }}, {{ selectedAddress.postnummer }}
              {{ selectedAddress.poststed }}
            </small>
            <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{
              $form.address.error?.message
            }}</Message>
          </div>

          <!-- Submit Button -->
          <div class="field">
            <Button type="submit" :label="t('create-listing')" />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 2rem;
  margin: 2rem 0;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow:
    0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  max-width: 800px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #343a40;
}

Textarea {
  width: 100%;
}

h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #495057;
}

.field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
}

.address-details {
  display: block;
  margin-top: 0.5rem;
  color: #6c757d;
}
</style>
