export default defineEventHandler(async (event) => {
  const uuid = getCookie(event, "session")
  const storage = useStorage("sessions")

  if (!uuid || !(await storage.hasItem(uuid))) {
    throw createError({
      statusCode: 400,
      statusMessage: "You are not logged in"
    })
  }

  storage.removeItem(uuid)
  deleteCookie(event, "session")
});
