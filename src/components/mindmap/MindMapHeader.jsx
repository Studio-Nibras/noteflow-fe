import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import IconButton from "../ui/IconButton";

export default function MindMapHeader({ onExport }) {
  const navigate = useNavigate();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <IconButton onClick={() => navigate("/workspace")}>
        <ArrowLeft size={18} />
      </IconButton>

      <h1 className="text-lg font-semibold">Mind Map</h1>

      <button
        onClick={onExport}
        className="
    px-4
    py-2
    rounded-lg
    bg-blue-600
    text-white
    hover:bg-blue-700
  "
      >
        Export PNG
      </button>
    </header>
  );
}
