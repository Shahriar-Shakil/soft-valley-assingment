import axios from "axios";
export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
