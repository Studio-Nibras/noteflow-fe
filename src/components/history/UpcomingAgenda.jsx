import { CalendarClock, Clock3 } from "lucide-react";

export default function UpcomingAgenda({ agendas }) {
  if (!agendas || agendas.length === 0) {
    return (
      <div>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Upcoming Agenda
          </h2>

          <p className="text-sm text-slate-500">Jadwal belajar berikutnya</p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-500">Belum ada agenda belajar.</p>
        </div>
      </div>
    );
  }

  const upcomingAgendas = [...agendas]
    .filter((agenda) => new Date(agenda.start_time) >= new Date())
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  if (upcomingAgendas.length === 0) {
    return (
      <div>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Upcoming Agenda
          </h2>

          <p className="text-sm text-slate-500">Jadwal belajar berikutnya</p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-500">
            Belum ada agenda belajar yang akan datang.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Upcoming Agenda
        </h2>

        <p className="text-sm text-slate-500">Jadwal belajar berikutnya</p>
      </div>

      <div className="space-y-4">
        {upcomingAgendas.map((agenda) => {
          const start = new Date(agenda.start_time);
          const end = agenda.end_time ? new Date(agenda.end_time) : null;

          const day = start.getDate();
          const month = start.toLocaleString("id-ID", { month: "short" });

          const time = `${start.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}${
            end
              ? ` - ${end.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : ""
          }`;

          return (
            <div
              key={agenda.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex gap-5">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {day}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {month}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {agenda.title}
                  </h3>

                  {agenda.description && (
                    <p className="mt-2 text-sm text-slate-500">
                      {agenda.description}
                    </p>
                  )}

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 size={16} />
                      <span>{time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarClock size={16} />
                      <span>Agenda Belajar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
