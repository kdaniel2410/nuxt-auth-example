import prisma from "~/lib/primsa";
import { userSchema } from "~/lib/yup";
import { verify } from "argon2";
import { v4 } from "uuid";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, async (body) => {
    return await userSchema.validate(body).catch((error) => {
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
      statusMessage: "Unauthorized",
    });
  }

  const session = { id: user.id, email: user.email };
  const uuid = v4();
  await useStorage("sessions").setItem(uuid, session);
  setCookie(event, "session", uuid);
  return "Logged in";
});
