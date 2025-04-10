<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { Toast, useToast } from "primevue";
import { authService, type UserRole } from "@/api/auth-service";
import router from "@/router";
import { useUserStore } from "@/state/user";
import { useI18n } from "vue-i18n";
import type { ApiError } from "@/api/services/core/ApiError";
const { t } = useI18n();

const initialValues = ref({
  phone: "",
  firstName: "",
  lastName: "",
  password: "",
  rememberMe: false,
});

const resolver = zodResolver(
  z.object({
    phone: z
      .string()
      .regex(/(0047|\+47|47)?(\d|\ ){8}/, {
        message: t("invalid-phone-number"),
      })
      .transform((v) => v.trim().replace(/\ /g, "")),
    firstName: z.string().min(1, {
      message: t("first-name-must-be-at-least-2-characters-long"),
    }),
    lastName: z.string().min(1, {
      message: t("last-name-must-be-at-least-2-characters-long"),
    }),
    password: z
      .string()
      .min(8, { message: t("password-must-be-at-least-8-characters-long") })
      .regex(/[a-z]/, { message: t("password-must-contain-at-least-one-lowercase-letter") })
      .regex(/[A-Z]/, { message: t("password-must-contain-at-least-one-uppercase-letter") })
      .regex(/[0-9]/, { message: t("password-must-contain-at-least-one-number") })
      .regex(/[^a-zA-Z0-9]/, { message: t("password-must-contain-at-least-one-special-character") })
      .transform((v) => v.trim().replace(" ", "")),
    rememberMe: z.boolean(),
  }),
);

const isLoading = ref(false);
const toast = useToast();
const { set: setUser } = useUserStore();

const onSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: (typeof initialValues)["value"];
}) => {
  isLoading.value = true;
  if (!valid) {
    toast.add({
      severity: "error",
      summary: t("please-make-sure-that-all-the-fields-are-valid"),
      life: 3000,
    });
    return;
  }
  try {
    const response = await authService.register(
      values.phone,
      values.password,
      values.firstName,
      values.lastName,
    );

    setUser({
      firstName: response.firstName,
      lastName: response.lastName,
      phone: values.phone,
      role: response.role as UserRole,
    });

    router.push({ name: "listings" });
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 409) {
      toast.add({
        severity: "error",
        summary: t("phone-already-exists"),
        life: 3000,
      });
    } else {
      console.error(apiError);
      toast.add({
        severity: "error",
        summary: t("registration-failed"),
        detail: import.meta.env.PROD ? t("an-error-occurred-during-registration") : error,
        life: 3000,
      });
    }
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="login-container">
    <Toast />
    <div class="login-panel">
      <h1 class="login-title">{{ t("create-an-account") }}</h1>

      <Form v-slot="$form" class="login-form" :initial-values :resolver @submit="onSubmit as any">
        <div class="double-field">
          <div class="field">
            <FloatLabel variant="in">
              <InputText name="firstName" type="text" fluid />
              <label for="in_label">{{ t("first-name") }}</label>
            </FloatLabel>
            <Message
              v-if="$form.firstName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.firstName.error?.message }}</Message
            >
          </div>
          <div class="field">
            <FloatLabel variant="in">
              <InputText name="lastName" type="text" fluid />
              <label for="in_label">{{ t("last-name") }}</label>
            </FloatLabel>
            <Message
              v-if="$form.lastName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.lastName.error?.message }}</Message
            >
          </div>
        </div>
        <div class="field">
          <FloatLabel variant="in">
            <IconField>
              <InputIcon>🇳🇴</InputIcon>
              <InputMask name="phone" type="text" fluid mask="999 99 999" />
            </IconField>
            <label for="in_label">{{ t("phone") }}</label>
          </FloatLabel>
          <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
            $form.phone.error?.message
          }}</Message>
        </div>

        <div class="field">
          <FloatLabel variant="in">
            <Password name="password" type="text" :feedback="false" fluid toggle-mask />
            <label for="in_label">{{ t("password") }}</label>
          </FloatLabel>
          <!-- <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
            $form.password.error?.message
          }}</Message> -->
          <template v-if="$form.password?.invalid">
            <Message
              v-for="(error, index) of $form.password.errors"
              :key="index"
              severity="error"
              size="small"
              variant="simple"
              >{{ error.message }}</Message
            >
          </template>
        </div>

        <div class="options-row">
          <div class="remember-me">
            <Checkbox name="rememberMe" :binary="true" />
            <label for="remember" class="checkbox-label">{{ t("remember-me") }}</label>
          </div>
        </div>

        <Button type="submit" :label="t('sign-up')" class="sign-in-button" :loading="isLoading" />

        <div class="signup-prompt">
          <span>{{ t("already-have-an-account") }} {{ " " }}</span>
          <RouterLink :to="{ name: 'sign-in' }" class="signin-link">{{ t("sign-in") }}</RouterLink>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.login-panel {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.login-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-label {
  cursor: pointer;
}

.forgot-link {
  cursor: pointer;
}

.forgot-link:hover {
  text-decoration: underline;
}

.sign-in-button {
  width: 100%;
  padding: 0.75rem;
}

.signup-prompt {
  text-align: center;
  margin-top: 1rem;
}

.signin-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.signin-link:hover {
  text-decoration: underline;
}

.error-container {
  margin-top: 1rem;
}

:deep(.p-password-input) {
  width: 100%;
}

:deep(.p-button) {
  justify-content: center;
}

.double-field {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
