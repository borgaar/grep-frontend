<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue";

const toast = useToast();

// Mock password service
const passwordService = {
  changePassword: async (currentPassword: string, newPassword: string) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, simulate success if current password is "password123"
        if (currentPassword === "password123") {
          resolve({ status: 200 });
        } else {
          reject(new Error("Current password is incorrect"));
        }
      }, 800);
    });
  },
};

const initialValues = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const resolver = zodResolver(
  z
    .object({
      currentPassword: z.string().min(1, { message: "Current password is required" }),
      newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
      confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
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
      summary: "Please make sure that all the fields are valid",
      life: 3000,
    });
    isLoading.value = false;
    return;
  }

  try {
    const response = await passwordService.changePassword(
      values.currentPassword,
      values.newPassword,
    );

    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Password updated",
        detail: "Your password has been changed successfully.",
        life: 3000,
      });

      // Reset form
      initialValues.value = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Password change failed",
      detail:
        error instanceof Error
          ? error.message
          : "Could not change your password. Please try again.",
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
    @submit="onSubmit"
  >
    <div class="field">
      <FloatLabel variant="in">
        <Password name="currentPassword" type="text" fluid toggle-mask />
        <label for="in_label">Current Password</label>
      </FloatLabel>
      <Message v-if="$form.currentPassword?.invalid" severity="error" size="small" variant="simple">
        {{ $form.currentPassword.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <Password name="newPassword" type="text" fluid toggle-mask />
        <label for="in_label">New Password</label>
      </FloatLabel>
      <Message v-if="$form.newPassword?.invalid" severity="error" size="small" variant="simple">
        {{ $form.newPassword.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <Password name="confirmPassword" type="text" fluid toggle-mask />
        <label for="in_label">Confirm Password</label>
      </FloatLabel>
      <Message v-if="$form.confirmPassword?.invalid" severity="error" size="small" variant="simple">
        {{ $form.confirmPassword.error?.message }}
      </Message>
    </div>

    <Button type="submit" label="Change Password" class="update-button" :loading="isLoading" />

    <div class="password-requirements">
      <h3>Password Requirements:</h3>
      <ul>
        <li>At least 8 characters</li>
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
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
