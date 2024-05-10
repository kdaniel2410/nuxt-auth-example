import prisma from "~/lib/prisma";
import { registerSchema } from "~/lib/yup";
import { hash } from "argon2";
import { randomUUID } from "crypto"

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, async (body) => {
    return await registerSchema.validate(body).catch((error) => {
      throw createError({
        statusCode: 400,
        statusMessage: error.errors,
      });
    });
  });

  const conflict = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (conflict) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is already in use",
    });
  }

  const passwordHash = await hash(body.password);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      passwordHash: passwordHash,
    },
  });

  const session = { id: user.id, email: user.email };
  const uuid = randomUUID()
  await useStorage("sessions").setItem(uuid, session);
  setCookie(event, "session", uuid);
  return "Registered";
});
