import { authService } from "../services/authService";
import { generateMindMap } from "../services/workspaceApi";
import { createNote } from "../services/lectureApi";
import { uploadFile } from "../services/workspaceApi";

import useAudioRecorder from "../hooks/useAudioRecorder";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";

import Card from "../components/ui/Card";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceBody from "../components/workspace/WorkspaceBody";
import WorkspaceBottomDock from "../components/workspace/WorkspaceBottomDock";

import { useNavigate } from "react-router-dom";

export default function Workspace() {
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const [currentNote, setCurrentNote] = useState({
    title: "",
    content: "",
    plainText: "",
    updatedAt: null,
  });

  const fileInputRef = useRef(null);

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();

      formData.append("file", file);

      formData.append("workspaceId", currentNote.id);

      const { data } = await uploadFile(formData);

      editor.commands.setContent(data.plainText);

      setCurrentNote((prev) => ({
        ...prev,
        plainText: data.plainText,
        content: editor.getHTML(),
      }));
    } catch (err) {
      console.error(err);
      alert("Upload gagal.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  const handleTranscript = (text) => {
    editor.commands.insertContent(text + " ");

    setCurrentNote((prev) => ({
      ...prev,

      plainText: prev.plainText + text + " ",

      content: editor.getHTML(),

      updatedAt: new Date().toISOString(),
    }));
  };

  const handleGenerateMindMap = async () => {
    const title = currentNote.title?.trim() || "";
    const isTitleEmpty = title === "";
    const isEditorEmpty = editor?.isEmpty ?? true;

    if (isTitleEmpty && isEditorEmpty) {
      alert("Please write your note first.");
      return;
    }

    if (!userId) {
      alert("Please sign in again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const noteResponse = await createNote({
        title,
        plainText: currentNote.plainText,
        userId,
      });

      const workspaceId = noteResponse?.data?.data?.id;

      if (!workspaceId) {
        throw new Error("Workspace ID not found");
      }

      const response = await generateMindMap({ workspaceId });

      localStorage.removeItem(`current-note-${userId}`);
      localStorage.setItem(
        "generated-mindmap",
        JSON.stringify(response?.data?.mindMap || {}),
      );
      localStorage.setItem("workspaceId", workspaceId);

      navigate("/mindmap");
    } catch (error) {
      console.error(error);

      if (error?.response) {
        console.log(error.response.data);
      }

      alert("Failed to generate mind map");
    } finally {
      setLoading(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your notes...",
      }),
    ],
    content: currentNote.content,
    onUpdate({ editor }) {
      setCurrentNote((prev) => ({
        ...prev,
        content: editor.getHTML(),
        plainText: editor.getText(),
        updatedAt: new Date().toISOString(),
      }));
    },
  });

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data } = await authService.getSession();

        if (!data?.session) {
          navigate("/");
          return;
        }

        setUserId(data.session.user.id);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    loadSession();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const saved = localStorage.getItem(`current-note-${userId}`);
    if (!saved) return;

    try {
      const note = JSON.parse(saved);

      setCurrentNote({
        title: note.title || "",
        content: note.content || "",
        plainText: note.plainText || "",
        updatedAt: note.updatedAt || null,
      });
    } catch (error) {
      console.error("Failed to parse saved draft", error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const timeout = window.setTimeout(() => {
      localStorage.setItem(
        `current-note-${userId}`,
        JSON.stringify(currentNote),
      );
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [currentNote, userId]);

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (currentContent !== currentNote.content) {
      editor.commands.setContent(currentNote.content || "", false);
    }
  }, [editor, currentNote.content]);

  return (
    <Card className="flex h-[calc(100vh-64px)] flex-col">
      <WorkspaceHeader
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />

      <WorkspaceBody editor={editor} />

      <WorkspaceBottomDock
        editor={editor}
        loading={loading}
        uploading={uploading}
        onGenerateMindMap={handleGenerateMindMap}
        onUploadFile={handleOpenFile}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        onTranscript={handleTranscript}
        isTranscribing={isTranscribing}
        setIsTranscribing={setIsTranscribing}
      />

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
        onChange={handleUpload}
      />
    </Card>
  );
}
