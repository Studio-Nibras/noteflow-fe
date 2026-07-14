import { CalendarPlus } from "lucide-react";

export default function AddAgendaButton({ onClick }) {
  return (
    <div
      className="rounded-3xl bg-linear-to-r 
              from-blue-600 
              to-cyan-500 p-6 text-white shadow-lg"
    >
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
          <CalendarPlus size={28} />
        </div>
      </div>

      <h2 className="mt-5 text-center text-xl font-bold">Tambah Agenda</h2>

      <p className="mt-2 text-center text-sm text-blue-100">
        Rencanakan jadwal belajarmu agar tetap konsisten setiap hari.
      </p>

      <button
        onClick={onClick}
        className="mt-6 w-full rounded-2xl bg-white py-3 font-semibold text-blue-500 transition hover:scale-[1.02] hover:bg-slate-100"
      >
        + Tambah Agenda
      </button>
    </div>
  );
}
