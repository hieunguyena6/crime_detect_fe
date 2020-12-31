export const getUserSession = () => {
  if (typeof window === "undefined") return null;
  const data = window?.localStorage.getItem("user")
  return data ? JSON.parse(data) : null
}

export const saveUserSession = data => {
  if (typeof window === "undefined") return null;
  window.localStorage.setItem("user", JSON.stringify(data))
}

export const removeUserSession = () => {
  if (typeof window === "undefined") return null;
  window.localStorage.removeItem("user")
}

export const removeUserSessionWhenExpired = () => {
  if (typeof window === "undefined") return null;
  window.localStorage.removeItem("user");
  window.location.href = window.location.origin + '/login';
}