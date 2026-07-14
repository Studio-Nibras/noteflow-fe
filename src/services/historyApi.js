import api from "./api";

export const getHistory = () => api.get("/history");

export const createHistory = (payload) => api.post("/history", payload);
