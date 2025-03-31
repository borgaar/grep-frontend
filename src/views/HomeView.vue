<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <main>
    <Button label="Hello world!" @click="console.log('bruh')" severity="success" />
  </main>
</template>
