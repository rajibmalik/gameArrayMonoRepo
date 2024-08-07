import axios from "axios";

const baseURL = `${
  import.meta.env.VITE_RENDER_URL || "http://localhost:3000"
}/api/v1`;

export default axios.create({
  baseURL,
});
