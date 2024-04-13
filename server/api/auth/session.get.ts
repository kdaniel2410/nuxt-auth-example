export default defineEventHandler(async (event) => {
  const session = event.context.session;

  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }

  return session;
});
