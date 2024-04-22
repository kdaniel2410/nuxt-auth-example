<template>
  <div class="flex flex-col gap-1">
    <label class="my-auto" for="email">Email Address</label>
    <PInputText type="text" class="grow" v-model="email" v-bind="emailProps" />
    <label class="my-auto" for="password">Password</label>
    <PPassword inputClass="grow" v-model="password" v-bind="passwordProps" />
    <label class="my-auto" for="confirmPassword">Confirm Password</label>
    <PPassword inputClass="grow" :feedback="false" v-model="confirmPassword" v-bind="confirmPasswordProps" />
    <div>
      <PMessage severity="error" v-for="error of Object.values(errors)">{{ error }}</PMessage>
    </div>
    <div class="flex justify-center">
      <PButton :disabled="!meta.dirty" @click="onSubmit">Register</PButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { registerSchema } from '~/lib/yup';
import { useForm } from 'vee-validate';

const { errors, meta, defineField, handleSubmit } = useForm({
  validationSchema: registerSchema
});

const [email, emailProps] = defineField("email")
const [password, passwordProps] = defineField("password")
const [confirmPassword, confirmPasswordProps] = defineField("confirmPassword")

const onSubmit = handleSubmit(async (values, { setFieldError }) => {
  await $fetch("/api/auth/register", {
    method: "POST",
    body: values,
  }).catch((error) => {
    setFieldError("email", error.data.statusMessage)
  })
  navigateTo("/protected")
})
</script>
