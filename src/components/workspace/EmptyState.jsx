import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <FileText
        size={48}
        className="mb-4 text-slate-300"
      />

      <h2 className="text-xl font-semibold text-slate-700">
        Start writing your notes
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Your notes will appear here.
      </p>
    </div>
  );
}