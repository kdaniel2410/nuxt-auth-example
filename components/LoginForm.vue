<template>
  <div class="flex flex-col gap-1">
    <div>
      <PMessage severity="error" v-for="message of messages">{{ message }}</PMessage>
    </div>
    <label for="email">Email Address</label>
    <PInputText class="grow" v-model="email" v-bind="emailProps" />
    <label for="password">Password</label>
    <PPassword inputClass="grow" :feedback="false" v-model="password" v-bind="passwordProps" />
    <div class="flex justify-center">
      <PButton :disabled="!meta.dirty" @click="login">Login</PButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginSchema } from '~/lib/yup';
import { useForm } from 'vee-validate';

const messages = ref<string[]>([])

const { values, errors, meta, defineField } = useForm({
  validationSchema: loginSchema
});

const [email, emailProps] = defineField("email")
const [password, passwordProps] = defineField("password")

const login = async () => {
  if (meta.value.valid) {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: values,
    }).catch((error) => {
      messages.value.push(error.statusMessage)
    })
    navigateTo("/protected")
  } else {
    for (const error of Object.values(errors.value)) {
      if (!error) continue
      messages.value.push(error)
    }
  }
}
</script>