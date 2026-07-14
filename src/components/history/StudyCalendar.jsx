import { useState } from "react";
import Calendar from "react-calendar";
import { CalendarDays } from "lucide-react";
import "react-calendar/dist/Calendar.css";

export default function StudyCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-xl">
          <CalendarDays className="text-blue-600" size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-lg">Study Calendar</h2>

          <p className="text-sm text-slate-500">Kelola jadwal belajarmu</p>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        onChange={setValue}
        value={value}
        className="w-full rounded-2xl border-none"
      />

      {/* Legend
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />

          <span className="text-slate-600">Hari ini</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />

          <span className="text-slate-600">Agenda</span>
        </div>
      </div> */}
    </div>
  );
}
