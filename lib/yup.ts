import { object, string, ref } from "yup";

export const registerSchema = object({
  email: string()
    .email("Email must be a valid email")
    .required("Email is required"),

  password: string().required("Password is required"),
  confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
});

export const loginSchema = object({
  email: string()
    .email("Email must be a valid email")
    .required("Email is required"),

  password: string().required("Password is required"),
});
