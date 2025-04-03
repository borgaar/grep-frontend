<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue";
import { authService } from "@/api/auth-service";
import router from "@/router";

const initialValues = ref({
  phone: "",
  firstName: "",
  lastName: "",
  password: "",
  rememberMe: false,
});

const resolver = zodResolver(
  z.object({
    phone: z.string().regex(/(0047|\+47|47)?(\d|\ ){8}/, {
      message: "Invalid phone number",
    }),
    firstName: z.string().min(1, {
      message: "First name must be at least 2 characters long",
    }),
    lastName: z.string().min(1, {
      message: "Last name must be at least 2 characters long",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    rememberMe: z.boolean(),
  }),
);

const isLoading = ref(false);
const toast = useToast();

const onSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: (typeof initialValues)["value"];
}) => {
  isLoading.value = true;
  if (valid) {
    toast.add({ severity: "success", summary: "Form is submitted.", life: 3000 });
    console.log("Form is submitted.", values);
  }
  await authService.register(values.phone, values.password, values.firstName, values.lastName);
  router.push({ name: "listings" });
  isLoading.value = false;
};
</script>

<template>
  <div class="login-container">
    <div class="login-panel">
      <h1 class="login-title">Create an Account</h1>

      <Form v-slot="$form" class="login-form" :initial-values :resolver @submit="onSubmit">
        <div class="double-field">
          <div class="field">
            <FloatLabel variant="in">
              <InputText name="firstName" type="text" fluid />
              <label for="in_label">First name</label>
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
              <label for="in_label">Last name</label>
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
            <label for="in_label">Phone number</label>
          </FloatLabel>
          <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
            $form.phone.error?.message
          }}</Message>
        </div>

        <div class="field">
          <FloatLabel variant="in">
            <Password name="password" type="text" :feedback="false" fluid toggle-mask />
            <label for="in_label">Password</label>
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
            <label for="remember" class="checkbox-label">Remember me</label>
          </div>
          <a class="forgot-link">Forgot password?</a>
        </div>

        <Button type="submit" label="Sign In" class="sign-in-button" :loading="isLoading" />

        <div class="signup-prompt">
          <span>Already have an account? </span>
          <RouterLink :to="{ name: 'sign-in' }" class="signin-link">Sign In</RouterLink>
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
