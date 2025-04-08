<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { authService, type UserRole } from "@/api/auth-service";
import router from "@/router";
import { RouterLink } from "vue-router";
import { useToast } from "primevue";
import { useUserStore } from "@/state/user";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { set: setUser } = useUserStore();

const toast = useToast();

const initialValues = ref({
  phone: "",
  password: "",
  rememberMe: false,
});

const resolver = zodResolver(
  z.object({
    phone: z.string().transform((v) => v.trim().replace(/\ /g, "")),
    password: z.string(),
    rememberMe: z.boolean(),
  }),
);

const isLoading = ref(false);

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
    const response = await authService.login(values.phone, values.password);

    setUser({
      phone: values.phone,
      role: response.role as UserRole,
      firstName: response.firstName,
      lastName: response.lastName,
    });

    router.push({ name: "listings" });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("login-failed"),
      detail:
        process.env.NODE_ENV === "development"
          ? error
          : t("could-not-reach-the-server-are-you-connected-to-the-internet"),
      life: 3000,
    });
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="login-container">
    <Toast />
    <div class="login-panel">
      <h1 class="login-title">{{ t("logg-inn") }}</h1>

      <Form v-slot="$form" class="login-form" :initial-values :resolver @submit="onSubmit as any">
        <div class="field">
          <FloatLabel variant="in">
            <InputText name="phone" type="text" fluid />
            <label for="in_label">{{ t("phone") }}</label>
          </FloatLabel>
          <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
            $form.phone.error?.message
          }}</Message>
        </div>

        <div class="field">
          <FloatLabel variant="in">
            <Password name="password" type="text" fluid toggle-mask />
            <label for="in_label">{{ t("password") }}</label>
          </FloatLabel>
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
            $form.password.error?.message
          }}</Message>
        </div>

        <div class="options-row">
          <div class="remember-me">
            <Checkbox name="rememberMe" :binary="true" />
            <label for="remember" class="checkbox-label">{{ t("remember-me") }}</label>
          </div>
        </div>

        <Button type="submit" label="Sign In" class="sign-in-button" :loading="isLoading" />

        <div class="signup-prompt">
          <span>{{ t("dont-have-an-account") }}{{ " " }}</span>
          <RouterLink :to="{ name: 'sign-up' }" class="signup-link">{{ t("sign-up") }}</RouterLink>
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

.signup-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.signup-link:hover {
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
</style>
