import { ChevronRight } from "lucide-react";

export default function MenuCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-5
        flex
        items-center
        justify-between
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-slate-800">{title}</h3>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      <ChevronRight size={20} className="text-slate-400" />
    </button>
  );
}
