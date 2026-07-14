import { ChevronRight } from "lucide-react";

export default function HistoryCard({ title, score, time }) {
  return (
    <div className="cursor-pointer rounded-2xl bg-white px-4 py-4 shadow-sm transition hover:shadow-md sm:px-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Kiri */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold sm:text-lg">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">Selesai • {time}</p>
        </div>

        {/* Kanan */}
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="w-full max-w-[160px] sm:w-28">
            <p className="mb-1 text-sm font-medium">Skor {score}/100</p>

            <div className="h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-green-500 transition-all"
                style={{
                  width: `${score}%`,
                }}
              />
            </div>
          </div>

          <ChevronRight className="hidden text-slate-500 sm:block" size={20} />
        </div>
      </div>
    </div>
  );
}
