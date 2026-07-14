export default function QuizOptions({ option, selected, onClick }) {
  const optionLetter = option.charAt(0);
  const optionText = option.substring(2);

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        px-5
        py-5
        transition-all
        duration-200
        flex
        items-center
        gap-4
        border
        hover:-translate-y-1
        ${
          selected
            ? "bg-blue-500 border-blue-500 text-white shadow-md"
            : "bg-blue-100 border-blue-100 hover:bg-blue-200 text-slate-800"
        }
      `}
    >
      {/* Circle */}
      <div
        className={`
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          text-sm
          font-semibold
          border
          flex-shrink-0
          ${
            selected
              ? "bg-white text-blue-600 border-white"
              : "bg-transparent border-slate-500 text-slate-700"
          }
        `}
      >
        {optionLetter}
      </div>

      {/* Text */}
      <p className="text-left text-lg leading-relaxed">{optionText}</p>
    </button>
  );
}
