<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue";
import { useUserStore } from "@/state/user";
import { UserControllerService } from "@/api/services";
import { type User } from "@/api/auth-service";
import { storeToRefs } from "pinia";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const toast = useToast();
const { set } = useUserStore();
const { user } = storeToRefs(useUserStore());

const initialValues = ref({
  firstName: user?.value?.firstName ?? "",
  lastName: user?.value?.lastName ?? "",
  phone: user?.value?.phone ?? "",
});

const resolver = zodResolver(
  z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().transform((v) => v.trim().replace(/\ /g, "")),
  }),
);

const isLoading = ref(false);

const onSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: typeof initialValues.value;
}) => {
  isLoading.value = true;
  if (!valid) {
    toast.add({
      severity: "error",
      summary: t("please-make-sure-that-all-the-fields-are-valid"),
      life: 3000,
    });
    isLoading.value = false;
    return;
  }

  try {
    const response = await UserControllerService.updateProfile({
      requestBody: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      },
    });

    set(response as User);

    toast.add({
      severity: "success",
      summary: t("profile-updated"),
      detail: t("your-profile-information-has-been-updated-successfully"),
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("update-failed"),
      detail:
        process.env.NODE_ENV === "development"
          ? error
          : t("something-went-wrong-while-updating-your-profile"),
      life: 3000,
    });
  }
  isLoading.value = false;
};
</script>

<template>
  <Form
    v-slot="$form"
    class="profile-form"
    :initial-values="initialValues"
    :resolver="resolver"
    @submit="onSubmit as any"
  >
    <div class="field">
      <FloatLabel variant="in">
        <InputText name="firstName" type="text" fluid />
        <label for="in_label">{{ t("first-name") }}</label>
      </FloatLabel>
      <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">
        {{ $form.firstName.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <InputText name="lastName" type="text" fluid />
        <label for="in_label">{{ t("last-name") }}</label>
      </FloatLabel>
      <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">
        {{ $form.lastName.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <InputText name="phone" type="text" fluid />
        <label for="in_label">{{ t("phone") }}</label>
      </FloatLabel>
      <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
        {{ $form.phone.error?.message }}
      </Message>
    </div>

    <Button type="submit" :label="t('update-profile')" class="update-button" :loading="isLoading" />
  </Form>
</template>

<style scoped>
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.update-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
}
</style>
