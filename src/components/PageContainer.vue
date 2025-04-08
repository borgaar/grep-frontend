<script lang="ts" setup />

<template>
  <div class="page-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.page-container {
  align-self: start;
  justify-self: center;
  max-width: 1200px;
  width: 100%;
  padding-inline: 20px;
}
</style>
