const MaterialCard = ({ material, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(material)}
      className={`
        flex justify-between items-center
        rounded-2xl
        border
        p-6
        cursor-pointer
        transition-all
        ${
          selected
            ? "border-green-500 bg-green-50"
            : "border-gray-200 bg-gray-50 hover:border-blue-400"
        }
      `}
    >
      <div>
        <h3 className="font-semibold text-lg">{material.title}</h3>

        <p className="text-sm text-gray-500">{material.subtitle}</p>
      </div>

      <div
        className={`
          w-6
          h-6
          rounded-md
          border-2
          flex
          items-center
          justify-center
          ${
            selected
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-400"
          }
        `}
      >
        {selected && "✓"}
      </div>
    </div>
  );
};

export default MaterialCard;
