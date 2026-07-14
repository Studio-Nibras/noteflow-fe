import { useNavigate } from "react-router-dom";
import { RotateCcw, House } from "lucide-react";

export default function OverviewActions() {
  const navigate = useNavigate();

  return (
    <div className="mt-12 flex justify-center gap-5">
      <button
        onClick={() => navigate("/quiz-page")}
        className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
      >
        <RotateCcw size={18} />
        Retake Quiz
      </button>

      <button
        onClick={() => navigate("/mindmap")}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-500"
      >
        <House size={18} />
        Back to Mind Map
      </button>
    </div>
  );
}
