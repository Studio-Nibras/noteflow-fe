import { CheckCircle2 } from "lucide-react";

export default function HistoryHeader({ completedMaterials = 0, lastOpened }) {
  const formatLastOpened = (date) => {
    if (!date) return "Belum ada aktivitas";

    const now = new Date();
    const opened = new Date(date);

    const diffMs = now - opened;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hari ini";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;

    return `${Math.floor(diffDays / 365)} tahun yang lalu`;
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
          Riwayat Belajar
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base lg:text-lg">
          Pantau progres dan eksplorasi pengetahuan Anda.
        </p>
      </div>

      <div className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 shadow-sm lg:w-80">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-14 sm:w-14">
          <CheckCircle2 className="text-green-600" size={26} />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-bold sm:text-lg">
            {completedMaterials} Materi Selesai
          </h3>

          <p className="text-xs text-slate-500 sm:text-sm">
            Terakhir dibuka {formatLastOpened(lastOpened)}
          </p>
        </div>
      </div>
    </div>
  );
}
