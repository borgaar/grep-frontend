<script setup lang="ts">
import { useFilterStore } from "@/state/filter";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { storeToRefs } from "pinia";
import { InputNumber, Message } from "primevue";
import { ref } from "vue";
import { z } from "zod";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const resolver = zodResolver(
  z.object({
    priceLower: z
      .number()
      .min(0, { message: "Minimum price must be at least 0" })
      .max(99999, { message: "Minimum price must be at most NOK 99,999" })
      .refine(
        (newLower) => {
          return priceUpper.value === undefined || newLower < priceUpper.value;
        },
        { message: "Minimum price must be less than maximum price" },
      )
      .nullable(),
    priceUpper: z
      .number()
      .min(1, { message: "Maximum price must be at least 1 (empty for no bound)" })
      .max(100000, { message: "Maximum price must be at most 100000 (empty for no bound)" })
      .refine(
        (newUpper) => {
          return priceLower.value === undefined || newUpper > priceLower.value;
        },
        { message: "Maximum price must be greater than minimum price" },
      )
      .nullable(),
  }),
);

const { priceLower, priceUpper } = storeToRefs(useFilterStore());

const priceLowerModel = ref<number | null>(null);
const priceUpperModel = ref<number | null>(null);

const onSubmit = ({ valid }: { valid: boolean }) => {
  if (!valid) {
    return;
  }

  priceLower.value = priceLowerModel.value ?? undefined;
  priceUpper.value = priceUpperModel.value ?? undefined;
};
</script>

<template>
  <Form v-slot="$form" :resolver class="form" @submit="onSubmit">
    <h3 class="title">{{ t("price") }}</h3>
    <div class="price-inputs">
      <div class="input-field">
        <InputNumber
          v-model="priceLowerModel"
          mode="currency"
          fluid
          :max-fraction-digits="0"
          currency="NOK"
          name="priceLower"
          :placeholder="`0 ${t('currency')}`"
          @value-change="() => onSubmit({ valid: $form.valid })"
        />
      </div>
      <span class="price-range-text" style="padding-inline: 5px">-></span>
      <div class="input-field">
        <InputNumber
          v-model="priceUpperModel"
          fluid
          mode="currency"
          :max-fraction-digits="0"
          currency="NOK"
          name="priceUpper"
          placeholder="∞"
          @value-change="() => onSubmit({ valid: $form.valid })"
        />
      </div>
    </div>
    <Message v-if="$form.priceLower?.invalid" severity="error">
      {{ $form.priceLower.error.message }}
    </Message>
    <Message v-if="$form.priceUpper?.invalid" severity="error">
      {{ $form.priceUpper.error.message }}
    </Message>
  </Form>
</template>

<style scoped>
.price-range-text {
  text-align: center;
}

.price-inputs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-bottom: 2px;
  font-weight: bold;
  text-align: center;
}

.input-field {
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
