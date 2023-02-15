export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.BACKEND_URL;
