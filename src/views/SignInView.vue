<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { httpClient } from "@/api/http-client";
import { authService } from "@/api/auth-service";
import router from "@/router";

const initialValues = ref({
  phone: "",
  password: "",
  rememberMe: false,
});

const norwegianPhoneRegex = /^(?:(?:\+|00)47)?[2-9]\d{7}$/;

const resolver = zodResolver(
  z.object({
    phone: z.string().regex(new RegExp(norwegianPhoneRegex), {
      message: "Invalid phone number",
    }),
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
  if (valid) {
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    console.log("Form is submitted.", values);
  }
  await authService.login(values.phone, values.password);
  router.push({ name: "listings" });
  isLoading.value = false;
};
</script>

<template>
  <div class="login-container">
    <div class="login-panel">
      <h1 class="login-title">Login</h1>

      <Form v-slot="$form" class="login-form" :initial-values :resolver @submit="onSubmit">
        <div class="field">
          <FloatLabel variant="in">
            <InputText name="phone" type="text" fluid />
            <label for="in_label">Phone</label>
          </FloatLabel>
          <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
            $form.phone.error?.message
          }}</Message>
        </div>

        <div class="field">
          <FloatLabel variant="in">
            <Password name="password" type="text" fluid toggle-mask />
            <label for="in_label">Password</label>
          </FloatLabel>
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
            $form.password.error?.message
          }}</Message>
        </div>

        <div class="options-row">
          <div class="remember-me">
            <Checkbox name="rememberMe" :binary="true" />
            <label for="remember" class="checkbox-label">Remember me</label>
          </div>
          <a class="forgot-link">Forgot password?</a>
        </div>

        <Button type="submit" label="Sign In" class="sign-in-button" :loading="isLoading" />

        <div class="signup-prompt">
          <span>Don't have an account? </span>
          <a class="signup-link">Sign up</a>
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
