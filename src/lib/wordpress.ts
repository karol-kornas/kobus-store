import axios from "axios";

export const wpApi = axios.create({
  baseURL: process.env.WP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});
