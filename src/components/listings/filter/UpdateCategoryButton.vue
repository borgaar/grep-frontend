<template>
  <div style="width: 100%">
    <Button class="card" icon="pi pi-pencil" @click="openDialog" />

    <Dialog
      v-model:visible="dialogVisible"
      modal
      :header="t('update-category')"
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
        <Button :label="t('update')" icon="pi pi-check" autofocus @click="submitForm" />
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

const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  onCategoryUpdated: {
    type: Function,
    required: true,
  },
});

const openDialog = () => {
  dialogVisible.value = true;
  submitted.value = false;
  inputText.value = props.categoryName;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const submitForm = async () => {
  submitted.value = true;

  if (inputText.value) {
    await CategoryControllerService.update1({
      requestBody: {
        oldName: props.categoryName,
        new: {
          name: inputText.value,
        },
      },
    });

    dialogVisible.value = false;
    submitted.value = false;

    props.onCategoryUpdated();
  }
};
</script>

<style scoped>
.p-fluid .field {
  margin-bottom: 1.5rem;
}

.card {
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
