import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const layouts = [
  {
    label: "Flow Map",
    value: "flow",
  },
  {
    label: "Tree Map",
    value: "tree",
  },
  {
    label: "Bubble Map",
    value: "bubble",
  },
  {
    label: "Multi Flow Map",
    value: "multi-flow",
  },
];

export default function LayoutSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected =
    layouts.find((layout) => layout.value === value) || layouts[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3
          py-2
          text-sm
        "
      >
        {selected.label}

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute
            bottom-14
            left-0
            w-56
            rounded-xl
            border
            bg-white
            shadow-xl
          "
        >
          {layouts.map((layout) => (
            <button
              key={layout.value}
              onClick={() => {
                onChange(layout.value);

                setOpen(false);
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                px-4
                py-3
                text-left
                hover:bg-slate-100
              "
            >
              {layout.label}

              {selected.value === layout.value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
