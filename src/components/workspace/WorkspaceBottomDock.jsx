import {
  Bold,
  Italic,
  Heading,
  List,
  FileUp,
  Mic,
  Loader2,
} from "lucide-react";
import { transcribeAudio } from "../../services/sttApi";

import Button from "../ui/Button";
import ToolbarButton from "./ToolbarButton";
import Divider from "../ui/Divider";

export default function WorkspaceBottomDock({
  editor,
  onGenerateMindMap,
  onUploadFile,
  loading,
  uploading,

  isRecording,
  startRecording,
  stopRecording,

  isTranscribing,
  setIsTranscribing,

  onTranscript,
}) {
  return (
    <footer
      className="
    flex
    flex-wrap
    items-center
    justify-between
    gap-4

    border-t
    border-slate-200

    bg-white

    px-4
    py-3

    md:px-6
  "
    >
      <div
        className="
    flex
    flex-wrap
    items-center
    gap-2
  "
      >
        <ToolbarButton
          icon={Bold}
          title="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />

        <ToolbarButton
          icon={Italic}
          title="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />

        <ToolbarButton
          icon={Heading}
          title="Heading"
          active={editor?.isActive("heading", { level: 2 })}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />

        <ToolbarButton
          icon={List}
          title="Bullet List"
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />

        <Divider vertical />

        <ToolbarButton
          icon={FileUp}
          title={uploading ? "Uploading..." : "Upload File"}
          disabled={uploading || isTranscribing}
          onClick={onUploadFile}
        />

        <ToolbarButton
          icon={isTranscribing ? Loader2 : Mic}
          active={isRecording}
          loading={isTranscribing}
          disabled={isTranscribing}
          title={
            isTranscribing
              ? "Transcribing..."
              : isRecording
                ? "Stop Recording"
                : "Start Recording"
          }
          onClick={async () => {
            try {
              if (!isRecording) {
                await startRecording();
                return;
              }

              const audioBlob = await stopRecording();

              setIsTranscribing(true);

              const formData = new FormData();
              formData.append("audio", audioBlob, "recording.webm");

              const result = await transcribeAudio(formData);

              onTranscript(result.transcript);
            } catch (err) {
              console.error(err);
              alert("Transkripsi gagal.");
            } finally {
              setIsTranscribing(false);
            }
          }}
          className={
            isRecording
              ? "bg-red-500 border-red-500 text-white animate-pulse"
              : ""
          }
        />
      </div>
      <Button
        onClick={onGenerateMindMap}
        disabled={loading}
        className={`
    w-full
    md:w-auto

    transition-all

    ${
      loading
        ? "opacity-50 cursor-not-allowed"
        : "hover:scale-105 hover:shadow-lg"
    }
  `}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ✨ Generating Mind Map...
          </div>
        ) : (
          "✨ Generate Mind Map"
        )}
      </Button>
    </footer>
  );
}

// ✨
