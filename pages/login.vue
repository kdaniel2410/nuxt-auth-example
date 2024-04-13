<template>
  <div>
    <h1 class="text-xl mb-1">Login</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["unauthenticated"]
})
</script>