import Button from "../ui/Button";
import ToolbarButton from "../workspace/ToolbarButton";
import { Plus, Minus, ScanSearch, Pencil } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import LayoutSelector from "./LayoutSelector";

export default function MindMapBottomDock({
  layoutStyle,
  setLayoutStyle,
  onGenerateQuiz,
  loadingQuiz,
}) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <footer className="flex h-16 items-center justify-between border-t shrink-0 border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2">
        <ToolbarButton icon={Plus} title="Zoom In" onClick={() => zoomIn()} />
        <ToolbarButton
          icon={Minus}
          title="Zoom Out"
          onClick={() => zoomOut()}
        />
        <ToolbarButton
          icon={ScanSearch}
          title="Fit View"
          onClick={() => fitView()}
        />
        <ToolbarButton icon={Pencil} />

        <LayoutSelector value={layoutStyle} onChange={setLayoutStyle} />
        <Button
          onClick={onGenerateQuiz}
          disabled={loadingQuiz}
          className={` transition-all ${
            loadingQuiz ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {loadingQuiz ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ✨ Generating Quiz...
            </div>
          ) : (
            "✨ Generate Quiz"
          )}
        </Button>
      </div>
    </footer>
  );
}
// ✨
