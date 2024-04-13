<template>
  <div class="flex flex-col gap-1">
    <label for="email">Email Address</label>
    <PInputText class="grow" v-model="email" v-bind="emailProps" />
    <label for="password">Password</label>
    <PPassword inputClass="grow" :feedback="false" v-model="password" v-bind="passwordProps" />
    <div class="flex justify-center">
      <PButton :disabled="!meta.valid" @click="login">Login</PButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userSchema } from '~/lib/yup';
import { useForm } from 'vee-validate';

const { values, errors, meta, defineField } = useForm({
  validationSchema: userSchema
});

const [email, emailProps] = defineField("email")
const [password, passwordProps] = defineField("password")

const login = async () => {
  if (meta.value.valid) {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: values,
    }).catch((error) => {
      console.log(error)
    })
    navigateTo("/protected")
  }
}
</script>