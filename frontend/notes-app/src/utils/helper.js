export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name || typeof name !== "string") {
    return "";
  }
  // Split the name into an array of words (handles multi-name strings)
  const words = name.trim().split(/\s+/);
  // Map each name to its first letter and join them into a string
  const initials = words.map((w) => w[0].toUpperCase()).join("");
  return initials;
};
