<script lang="ts" setup>
import PersonalInfoForm from "@/components/profile/PersonalInfoForm.vue";
import PasswordForm from "@/components/profile/PasswordForm.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="profile-container">
    <Toast />
    <div class="profile-panel">
      <h1 class="profile-title">{{ $t("profile") }}</h1>

      <div class="profile-tabs">
        <TabView>
          <TabPanel :header="t('personal-information')" value="personal">
            <PersonalInfoForm />
          </TabPanel>
          <TabPanel :header="t('change-password')" value="password">
            <PasswordForm />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.profile-panel {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.profile-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
}

.profile-tabs {
  margin-top: 1rem;
}

:deep(.p-tabview-panels) {
  padding: 1.5rem 0;
}
</style>
