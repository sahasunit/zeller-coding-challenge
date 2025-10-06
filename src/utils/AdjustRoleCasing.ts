// Format the user's role (eg. "ADMIN" -> "Admin")
export const AdjustRoleCasing = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}