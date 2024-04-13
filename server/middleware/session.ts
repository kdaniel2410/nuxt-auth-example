export default defineEventHandler(async (event) => {
  const uuid = getCookie(event, "session");
  const storage = useStorage("sessions");

  if (uuid) {
    if (await storage.hasItem(uuid)) {
      event.context.session = await storage.getItem(uuid);
    } else {
      deleteCookie(event, "session");
    }
  }
});
