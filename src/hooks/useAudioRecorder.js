import { useRef, useState } from "react";

export default function useAudioRecorder() {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);

      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.start();

      recorderRef.current = recorder;

      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Microphone tidak diizinkan.");
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (!recorderRef.current) return;

      recorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        // stop mic
        streamRef.current?.getTracks().forEach((track) => track.stop());

        setIsRecording(false);

        resolve(blob);
      };

      recorderRef.current.stop();
    });
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}
