import { object, string } from "yup";

export const userSchema = object({
  email: string().email().required(),
  password: string().required()
})