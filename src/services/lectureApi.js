import api from "./api";

export const createNote = (payload) =>
  api.post("/lectures/create-note", payload);
