import api from "./api";

export const generateQuiz = (payload) =>
  api.post("/workspace/generate-quiz", payload);

export const getQuizByWorkspace = (workspaceId) =>
  api.get(`/workspace/${workspaceId}/quiz`);

export const getQuizList = async () => {
  return api.get("/list");
};
