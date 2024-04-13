export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie("session")

  if (!cookie.value) {
    return abortNavigation()
  }
});
