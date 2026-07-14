import api from "./api";

export const createAgenda = (payload) => api.post("/agenda", payload);

export const getAgenda = () => api.get("/agenda");

export const deleteAgenda = (id) => api.delete(`/agenda/${id}`);
