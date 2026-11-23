// on your computer -> port 8000, on AWS -> "/api" (nginx handles it)
export const BASE =
  window.location.hostname === "localhost" ? "http://localhost:8000" : "/api";