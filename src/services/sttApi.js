import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const transcribeAudio = async (formData) => {
  const { data } = await api.post("/stt/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
