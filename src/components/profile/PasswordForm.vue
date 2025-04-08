<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue";
import { AuthControllerService } from "@/api/services";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const toast = useToast();

const initialValues = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const resolver = zodResolver(
  z
    .object({
      currentPassword: z.string().min(1, { message: t("current-password-is-required") }),
      newPassword: z
        .string()
        .min(8, { message: t("password-must-be-at-least-8-characters") })
        .regex(/[A-Z]/, { message: t("password-must-contain-at-least-one-uppercase-letter") })
        .regex(/[a-z]/, { message: t("password-must-contain-at-least-one-lowercase-letter") })
        .regex(/[0-9]/, { message: t("password-must-contain-at-least-one-number") }),
      confirmPassword: z.string().min(1, { message: t("please-confirm-your-password") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords-dont-match"),
      path: ["confirmPassword"],
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
    await AuthControllerService.updatePassword({
      requestBody: {
        newPassword: values.newPassword,
        oldPassword: values.currentPassword,
      },
    });

    toast.add({
      severity: "success",
      summary: t("password-updated"),
      detail: t("your-password-has-been-changed-successfully"),
      life: 3000,
    });

    // Reset form
    initialValues.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("password-change-failed"),
      detail:
        error instanceof Error
          ? error.message
          : t("could-not-change-your-password-please-try-again"),
      life: 3000,
    });
  }
  isLoading.value = false;
};
</script>

<template>
  <Form
    v-slot="$form"
    class="password-form"
    :initial-values="initialValues"
    :resolver="resolver"
    @submit="onSubmit as any"
  >
    <div class="field">
      <FloatLabel variant="in">
        <Password name="currentPassword" type="text" fluid toggle-mask />
        <label for="in_label">{{ t("current-password") }}</label>
      </FloatLabel>
      <Message v-if="$form.currentPassword?.invalid" severity="error" size="small" variant="simple">
        {{ $form.currentPassword.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <Password name="newPassword" type="text" fluid toggle-mask />
        <label for="in_label">{{ t("new-password") }}</label>
      </FloatLabel>
      <Message v-if="$form.newPassword?.invalid" severity="error" size="small" variant="simple">
        {{ $form.newPassword.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <Password name="confirmPassword" type="text" fluid toggle-mask />
        <label for="in_label">{{ t("confirm-password") }}</label>
      </FloatLabel>
      <Message v-if="$form.confirmPassword?.invalid" severity="error" size="small" variant="simple">
        {{ $form.confirmPassword.error?.message }}
      </Message>
    </div>

    <Button type="submit" label="Change Password" class="update-button" :loading="isLoading" />

    <div class="password-requirements">
      <h3>{{ t("password-requirements") }}</h3>
      <ul>
        <li>{{ t("at-least-8-characters") }}</li>
        <li>{{ t("at-least-one-uppercase-letter") }}</li>
        <li>{{ t("at-least-one-lowercase-letter") }}</li>
        <li>{{ t("at-least-one-number") }}</li>
      </ul>
    </div>
  </Form>
</template>

<style scoped>
.password-form {
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

.password-requirements {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.password-requirements h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.password-requirements ul {
  padding-left: 1.5rem;
  margin: 0;
}

:deep(.p-password-input) {
  width: 100%;
}
</style>
