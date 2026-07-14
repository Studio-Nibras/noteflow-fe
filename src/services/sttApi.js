import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const transcribeAudio = (audioBlob) => {
  const formData = new FormData();

  formData.append("audio", audioBlob, "recording.webm");

  return api.post("/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
