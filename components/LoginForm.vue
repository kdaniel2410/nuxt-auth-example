<template>
  <div class="flex flex-col gap-1">
    <label for="email">Email Address</label>
    <PInputText class="grow" v-model="email" v-bind="emailProps" />
    <label for="password">Password</label>
    <PPassword inputClass="grow" :feedback="false" v-model="password" v-bind="passwordProps" />
    <div>
      <PMessage severity="error" v-for="error of errors">{{ error }}</PMessage>
    </div>
    <div class="flex justify-center">
      <PButton :disabled="!meta.dirty" @click="onSubmit">Login</PButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginSchema } from '~/lib/yup';
import { useForm } from 'vee-validate';

const { errors, meta, defineField, handleSubmit } = useForm({
  validationSchema: loginSchema
});

const [email, emailProps] = defineField("email")
const [password, passwordProps] = defineField("password")

const onSubmit = handleSubmit(async (values, { setFieldError }) => {
  await $fetch("/api/auth/login", {
    method: "POST",
    body: values,
  }).catch((error) => {
    setFieldError("email", error.data.statusMessage)
  })
  navigateTo("/protected")
})
</script>
