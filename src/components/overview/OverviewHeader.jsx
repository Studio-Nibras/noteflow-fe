export default function OverviewHeader({ score, total, percentage, badge }) {
  return (
    <div
      className="rounded-3xl bg-linear-to-r 
              from-blue-600 
              to-cyan-500 p-10 text-center text-white shadow-xl"
    >
      <p className="text-lg opacity-90">Quiz Completed 🎉</p>

      <h1 className="mt-4 text-7xl font-bold">{percentage}%</h1>

      <p className="mt-3 text-xl">
        {score} / {total} Correct Answer
      </p>

      <div
        className={`inline-block mt-6 rounded-full border px-5 py-2 text-sm font-semibold ${badge.color}`}
      >
        {badge.title}
      </div>
      <p className="mt-5 text-blue-100">
        {percentage >= 90 && "Outstanding! Kamu sudah menguasai materi ini."}

        {percentage >= 70 &&
          percentage < 90 &&
          "Kerja bagus! Tinggal sedikit lagi menuju sempurna."}

        {percentage >= 50 &&
          percentage < 70 &&
          "Pemahamanmu sudah cukup baik, terus latihan ya!"}

        {percentage < 50 &&
          "Jangan menyerah, coba ulangi materi dan kerjakan lagi."}
      </p>
    </div>
  );
}
