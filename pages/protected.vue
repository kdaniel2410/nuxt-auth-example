<template>
  <div>
    <h1 class="text-xl mb-1">Protected</h1>
    <p>This page is protected, you must be logged in to view it</p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"]
})
</script>