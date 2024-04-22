<template>
  <div>
    <h1 class="text-xl mb-1">Register</h1>
    <RegisterForm />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["guest-only"]
})
</script>
