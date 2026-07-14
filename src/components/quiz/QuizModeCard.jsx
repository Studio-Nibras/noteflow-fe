const QuizModeCard = ({
  icon,
  title,
  description,
  buttonText,
  disabled,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col justify-between">
      <div>
        <div className="mb-5">{icon}</div>

        <h2 className="text-2xl font-semibold text-blue-600">{title}</h2>

        <p className="mt-4 text-gray-600 leading-8">{description}</p>
      </div>

      <button
        disabled={disabled}
        onClick={onClick}
        className="
          mt-10
          self-end
          px-8
          py-3
          rounded-xl
          bg-blue-500
          text-white
          disabled:bg-gray-300
        "
      >
        {buttonText}
      </button>
    </div>
  );
};

export default QuizModeCard;
