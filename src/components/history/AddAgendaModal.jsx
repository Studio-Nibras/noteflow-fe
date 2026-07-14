import { X } from "lucide-react";
import { useState } from "react";
import { createAgenda } from "../../services/agendaApi";

export default function AddAgendaModal({ open, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = "06f85e25-833d-4d00-9778-8dd2ce38d238";

  if (!open) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = async () => {
    if (!title || !date || !startTime) {
      alert("Judul, tanggal, dan jam mulai wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const start = `${date}T${startTime}:00`;
      const end = endTime ? `${date}T${endTime}:00` : null;

      await createAgenda({
        user_id: userId,
        title,
        description,
        start_time: start,
        end_time: end,
      });

      resetForm();
      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan agenda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl animate-in fade-in zoom-in duration-200 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Tambah Agenda</h2>
            <p className="mt-1 text-sm text-slate-500">
              Jadwalkan sesi belajarmu.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Judul</label>
            <input
              type="text"
              placeholder="Contoh: Belajar React Hooks"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Deskripsi</label>
            <textarea
              rows={4}
              placeholder="Opsional..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Jam Mulai
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Jam Selesai
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-3 font-medium hover:bg-slate-100 sm:w-auto"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Menyimpan..." : "Simpan Agenda"}
          </button>
        </div>
      </div>
    </div>
  );
}
