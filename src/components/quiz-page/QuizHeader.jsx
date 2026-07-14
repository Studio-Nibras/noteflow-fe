import { Clock3 } from "lucide-react";

export default function QuizHeader({ title, current, total, timer }) {
  return (
    <div className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-10 py-6">
        <div>
          <p className="text-lg font-medium text-slate-500">Pilihan Ganda</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">{title}</h1>
        </div>

        <div className="text-right">
          <p className="text-base font-medium text-slate-600">
            Soal {current} dari {total}
          </p>

          <div className="mt-2 flex items-center justify-end gap-2 text-blue-600">
            <Clock3 size={18} />

            <span className="font-semibold"> {timer} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
