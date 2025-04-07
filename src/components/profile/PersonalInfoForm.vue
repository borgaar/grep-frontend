<script lang="ts" setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue";

const toast = useToast();

// Mock user profile service
const userProfileService = {
  updateProfile: async (firstName: string, lastName: string, phone: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200 });
      }, 800);
    });
  },

  getCurrentUser: async () => {
    // Simulate API call to get current user data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          firstName: "John",
          lastName: "Doe",
          phone: "+4798765432",
        });
      }, 300);
    });
  },
};

// Fetch user data when component mounts
const userData = ref({
  firstName: "",
  lastName: "",
  phone: "",
});

// Load user data
const loadUserData = async () => {
  try {
    const user = await userProfileService.getCurrentUser();
    userData.value = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error loading profile",
      detail: "Could not load your profile information.",
      life: 3000,
    });
  }
};

loadUserData();

const initialValues = ref({
  firstName: userData.value.firstName,
  lastName: userData.value.lastName,
  phone: userData.value.phone,
});

const norwegianPhoneRegex = /^(?:(?:\+|00)47)?[2-9]\d{7}$/;

const resolver = zodResolver(
  z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().regex(new RegExp(norwegianPhoneRegex), {
      message: "Invalid phone number",
    }),
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
    const response = await userProfileService.updateProfile(
      values.firstName,
      values.lastName,
      values.phone,
    );

    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Profile updated",
        detail: "Your profile information has been updated successfully.",
        life: 3000,
      });

      // Update local user data
      userData.value = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      };
    } else {
      toast.add({
        severity: "error",
        summary: "Update failed",
        detail: "Could not update your profile information.",
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Update failed",
      detail:
        process.env.NODE_ENV === "development"
          ? error
          : "Could not reach the server. Are you connected to the internet?",
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
    :initial-values="userData"
    :resolver="resolver"
    @submit="onSubmit"
  >
    <div class="field">
      <FloatLabel variant="in">
        <InputText name="firstName" type="text" fluid />
        <label for="in_label">First Name</label>
      </FloatLabel>
      <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">
        {{ $form.firstName.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <InputText name="lastName" type="text" fluid />
        <label for="in_label">Last Name</label>
      </FloatLabel>
      <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">
        {{ $form.lastName.error?.message }}
      </Message>
    </div>

    <div class="field">
      <FloatLabel variant="in">
        <InputText name="phone" type="text" fluid />
        <label for="in_label">Phone</label>
      </FloatLabel>
      <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
        {{ $form.phone.error?.message }}
      </Message>
    </div>

    <Button type="submit" label="Update Profile" class="update-button" :loading="isLoading" />
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
