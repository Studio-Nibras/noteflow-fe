export default function QuizProgress({ current, total }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full h-2 bg-zinc-200 rounded-full">
      <div
        className="h-full bg-blue-500 rounded-full transition-all"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
