import axios from "axios";

const http = axios.create({
  baseURL: "http://174.138.22.139:5099/api/v1",
});

export default http;
