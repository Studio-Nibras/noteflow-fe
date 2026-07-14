export default function ProfileCard({
  name,
  email,
  workspaceCount,
  learningPoint,
}) {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300">
      <div
        className="w-24 h-24 rounded-full 
        bg-linear-to-r 
              from-blue-600 
              to-cyan-500 flex items-center justify-center text-white text-3xl font-bold"
      >
        {initials}
      </div>

      <h2 className="mt-5 text-2xl font-bold">{name}</h2>

      <p className="text-slate-500 mt-1">{email}</p>

      <div className="flex justify-center gap-16 mt-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-slate-800">
            {workspaceCount}
          </h3>

          <p className="text-slate-500 mt-1">Materi</p>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-blue-500">{learningPoint}</h3>

          <p className="text-slate-500 mt-1">Learning Points</p>
        </div>
      </div>
    </div>
  );
}
