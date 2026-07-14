import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/workspace",
});

export const generateMindMap = (payload) =>
  api.post("/generate-mindmap", payload);
