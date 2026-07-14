export default function QuizNavigation({
  current,
  total,
  onNext,
  onPrev,
  onSubmit,
}) {
  const last = current === total - 1;

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="px-5 py-2 rounded-lg bg-zinc-800 disabled:opacity-40"
      >
        Previous
      </button>

      {last ? (
        <button
          onClick={onSubmit}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={onNext}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
        >
          Next
        </button>
      )}
    </div>
  );
}
