<script lang="ts" setup>
import { CategoryControllerService, ListingControllerService } from "@/api/services";
import router from "@/router";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { onMounted, ref } from "vue";
import { z } from "zod";

interface AddressResponse {
  adresser: Address[];
}

interface Address {
  adressetekst: string;
  poststed: string;
  postnummer: string;
  representasjonspunkt: Coordinates;
  displayText?: string; // Added for AutoComplete display
}

interface Coordinates {
  lat: number;
  lon: number;
}

class GeoNorge {
  private static readonly BASE_URL = "https://ws.geonorge.no/adresser/v1/sok?";

  static async search(searchString: string): Promise<AddressResponse> {
    const response = await fetch(
      this.BASE_URL +
        new URLSearchParams({
          fuzzy: "true",
          sok: searchString,
        }).toString(),
    );

    const data = (await response.json()) as AddressResponse;
    return data;
  }
}

const categories = ref<string[]>([]);
const addressSearch = ref("");
const addressSuggestions = ref<Address[]>([]);
const selectedAddress = ref<Address | null>(null);
const listing = ref({
  title: "",
  description: "",
  price: null,
  category: {
    name: "",
  },
  location: {
    lat: 0,
    lon: 0,
  },
});

const resolver = zodResolver(
  z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number").nullable(),
    category: z.object({
      name: z.string().min(1, "Category is required"),
    }),
    location: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
  }),
);

onMounted(async () => {
  categories.value = (
    await CategoryControllerService.getAll({
      page: 0,
      pageSize: 100,
    })
  ).map((category) => category.name);
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
      console.error("Error searching for address:", error);
      addressSuggestions.value = [];
    }
  }
};

const selectAddress = (event: { value: Address }) => {
  selectedAddress.value = event.value;

  if (event.value.representasjonspunkt) {
    listing.value.location.lat = event.value.representasjonspunkt.lat;
    listing.value.location.lon = event.value.representasjonspunkt.lon;
  }
};

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
  if (!valid) {
    return;
  }

  const formData = { ...listing.value };

  await ListingControllerService.create({
    requestBody: {
      title: formData.title,
      description: formData.description,
      price: formData.price!,
      category: formData.category.name,
      location: {
        lat: formData.location.lat,
        lon: formData.location.lon,
      },
    },
  });

  router.back();
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Create New Listing</h2>
      <Form v-slot="$form" :resolver :initial-values="listing" @submit="onFormSubmit">
        <div class="p-fluid">
          <div class="field">
            <label for="title">Title</label>
            <InputText v-model="listing.title" name="title" type="text" required fluid />
            <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
              $form.title.error?.message
            }}</Message>
          </div>

          <div class="field">
            <label for="description">Description</label>
            <Textarea
              id="description"
              v-model="listing.description"
              auto-resize
              rows="5"
              required
            />
            <Message
              v-if="$form.description?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.description.error?.message }}</Message
            >
          </div>

          <div class="field">
            <label for="price">Price</label>
            <InputNumber
              id="price"
              v-model="listing.price"
              mode="currency"
              currency="NOK"
              required
            />
            <Message v-if="$form.price?.invalid" severity="error" size="small" variant="simple">{{
              $form.price.error?.message
            }}</Message>
          </div>

          <div class="field">
            <label for="category">Category</label>
            <Dropdown
              id="category"
              v-model="listing.category.name"
              :options="categories"
              placeholder="Select a Category"
              required
            />
            <Message
              v-if="$form.category?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.category.error?.message }}</Message
            >
          </div>

          <div class="field">
            <label for="address">Address</label>
            <AutoComplete
              id="address"
              v-model="addressSearch"
              :suggestions="addressSuggestions"
              placeholder="Search for an address"
              option-label="adressetekst"
              :delay="500"
              field="displayText"
              @complete="searchAddress"
              @item-select="selectAddress"
            />
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
            <Button type="submit" label="Create Listing" />
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
