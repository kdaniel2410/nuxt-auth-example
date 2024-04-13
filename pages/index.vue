<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
const logout = async () => {
  await $fetch("/api/auth/logout", {
    method: "POST",
  }).catch((error) => {
    console.log(error)
  })
  navigateTo("/")
}
</script>