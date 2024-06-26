import prisma from "~/lib/prisma";
import { loginSchema } from "~/lib/yup";
import { verify } from "argon2";
import { randomUUID } from "crypto"

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, async (body) => {
    return await loginSchema.validate(body).catch((error) => {
      throw createError({
        statusCode: 400,
        statusMessage: error.errors,
      });
    });
  });

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user || !(await verify(user.passwordHash, body.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login not found",
    });
  }

  const session = { id: user.id, email: user.email };
  const uuid = randomUUID()
  await useStorage("sessions").setItem(uuid, session);
  setCookie(event, "session", uuid);
  return "Logged in";
});
