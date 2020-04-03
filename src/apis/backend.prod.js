import axios from "axios";

export default axios.create({
  baseURL: "https://api.flatten.ca/",
  withCredentials: true
});
