import { object, string, ref } from "yup";

export const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
});

export const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});
