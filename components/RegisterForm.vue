<template>
  <div class="flex flex-col gap-1">
    <label class="my-auto" for="email">Email Address</label>
    <PInputText class="grow" v-model="email" v-bind="emailProps" />
    <label class="my-auto" for="password">Password</label>
    <PPassword inputClass="grow" :feedback="false" v-model="password" v-bind="passwordProps" />
    <div class="flex justify-center">
      <PButton :disabled="!meta.valid" @click="register">Register</PButton>
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

const register = async () => {
  if (meta.value.valid) {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: values,
    }).catch((error) => {
      console.log(error)
    })
    navigateTo("/protected")
  }
}
</script>