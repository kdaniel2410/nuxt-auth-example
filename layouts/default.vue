<template>
  <div>
    <PMenubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
    </PMenubar>
    <slot />
  </div>
</template>

<script setup>
const items = ref([
  {
    label: "Nuxt Auth Example",
    route: "/"
  },
  {
    label: "Register",
    icon: "pi pi-user-plus",
    route: "/register"
  },
  {
    label: "Login",
    icon: "pi pi-user",
    route: "/login"
  },
  {
    label: "Protected",
    icon: "pi pi-lock",
    route: "/protected"
  },
  {
    label: "Logout",
    icon: "pi pi-user-minus",
    command: async () => {
      await $fetch("/api/auth/logout", {
        method: "POST",
      })
      navigateTo("/")
    }
  },
]);
</script>
