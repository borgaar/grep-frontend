<template>
  <div style="width: 100%">
    <Button class="card" :label="t('create-category')" icon="pi pi-plus" @click="openDialog" />

    <Dialog
      v-model:visible="dialogVisible"
      modal
      :header="t('enter-text')"
      :style="{ width: '30rem' }"
    >
      <div class="p-fluid">
        <div class="field">
          <InputText
            id="input-text"
            v-model="inputText"
            :placeholder="t('category-name')"
            autofocus
            :class="{ 'p-invalid': submitted && !inputText }"
          />
          <small v-if="submitted && !inputText" class="p-error">{{ t("name-is-required") }}</small>
        </div>
      </div>

      <template #footer>
        <Button
          :label="t('cancel')"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeDialog"
        />
        <Button :label="t('submit')" icon="pi pi-check" autofocus @click="submitForm" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { CategoryControllerService } from "@/api/services";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const dialogVisible = ref(false);
const inputText = ref("");
const submitted = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
  submitted.value = false;
  inputText.value = "";
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const props = defineProps({
  onCategoryCreated: {
    type: Function,
    required: true,
  },
});

const submitForm = async () => {
  submitted.value = true;

  if (inputText.value) {
    await CategoryControllerService.create1({
      requestBody: {
        name: inputText.value,
      },
    });

    dialogVisible.value = false;

    inputText.value = "";
    submitted.value = false;

    props.onCategoryCreated();
  }
};
</script>

<style scoped>
.p-fluid .field {
  margin-bottom: 1.5rem;
}

.card {
  width: 100%;
  background-color: transparent;
  color: var(--p-text-color);
  border: none;
}

.card:hover {
  background-color: transparent;
  color: var(--p-primary-color);
  border: none;
}
</style>
