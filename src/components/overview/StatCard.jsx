export default function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-blue-600">{icon}</div>

      <p className="mt-3 text-slate-500">{title}</p>

      <h2 className="mt-1 text-3xl font-bold">{value}</h2>
    </div>
  );
}
