import { useEffect, useState } from "react";

import HistoryHeader from "../components/history/HistoryHeader";
import HistoryCard from "../components/history/HistoryCard";
import StudyCalendar from "../components/history/StudyCalendar";
import UpcomingAgenda from "../components/history/UpcomingAgenda";
import AddAgendaButton from "../components/history/AddAgendaButton";
import AddAgendaModal from "../components/history/AddAgendaModal";

import { getHistory } from "../services/historyApi";
import { getAgenda } from "../services/agendaApi";

export default function HistoryPage() {
  const [histories, setHistories] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const completedMaterials = histories.length;

  const lastOpened =
    histories.length > 0
      ? histories.reduce((latest, current) =>
          new Date(current.completed_at) > new Date(latest.completed_at)
            ? current
            : latest,
        )
      : null;

  const formatSection = (date) => {
    if (!date) return "Tidak ada data";

    const today = new Date().toDateString();
    const historyDate = new Date(date).toDateString();

    if (today === historyDate) return "Hari Ini";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
    });
  };

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      setHistories(response.data?.data ?? []);
    } catch (err) {
      console.error(err);
      setHistories([]);
    }
  };

  const fetchAgenda = async () => {
    try {
      const response = await getAgenda();
      setAgendas(response.data?.data ?? []);
    } catch (err) {
      console.error("Fetch Agenda Error:", err);
      setAgendas([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchHistory(), fetchAgenda()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sections = [
    ...new Set(histories.map((item) => formatSection(item.completed_at))),
  ];

  const handleSuccessCreateAgenda = async () => {
    await fetchAgenda();
    setOpenModal(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-slate-500">Loading History...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <HistoryHeader
          completedMaterials={completedMaterials}
          lastOpened={lastOpened?.completed_at}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-5 xl:gap-10">
          <div className="space-y-10 xl:col-span-3">
            {histories.length === 0 ? (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <h3 className="text-xl font-semibold">
                  Belum ada riwayat belajar
                </h3>

                <p className="mt-2 text-slate-500">
                  Kerjakan quiz pertama kamu untuk melihat histori belajar.
                </p>
              </div>
            ) : (
              sections.map((section) => (
                <div key={section}>
                  <h2 className="mb-6 text-lg font-bold uppercase text-slate-500">
                    {section}
                  </h2>

                  <div className="space-y-5">
                    {histories
                      .filter(
                        (item) => formatSection(item.completed_at) === section,
                      )
                      .map((history) => (
                        <HistoryCard
                          truncate
                          key={history.id}
                          title={history.title}
                          score={history.percentage}
                          time={new Date(
                            history.completed_at,
                          ).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        />
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="xl:col-span-2">
            <div className="space-y-6 xl:sticky xl:top-8">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <StudyCalendar agendas={agendas} />
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <UpcomingAgenda agendas={agendas} />
              </div>

              <AddAgendaButton onClick={() => setOpenModal(true)} />
            </div>
          </div>
        </div>

        <AddAgendaModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={handleSuccessCreateAgenda}
        />
      </main>
    </div>
  );
}
