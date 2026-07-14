import api from "./api";

export const generateMindMap = (payload) =>
  api.post("/workspace/generate-mindmap", payload);

export const getMindMap = (workspaceId) =>
  api.get(`/workspace/mindmap/${workspaceId}`);

export const uploadFile = (formData) => {
  return api.post("/workspace/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
