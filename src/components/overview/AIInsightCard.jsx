export default function AIInsightCard({ correct }) {
  return (
    <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6">
      <h4 className="font-bold text-blue-700">🤖 AI Insight</h4>
      <p className="mt-3 leading-relaxed text-slate-700">
        {correct
          ? "Bagus! Kamu sudah memahami konsep ini."
          : "Pelajari kembali materi ini agar pemahamanmu semakin kuat."}
      </p>
    </div>
  );
}
