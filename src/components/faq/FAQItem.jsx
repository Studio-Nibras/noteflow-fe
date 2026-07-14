import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          p-5
          flex
          justify-between
          items-center
          text-left
        "
      >
        <span className="font-semibold">{question}</span>

        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="px-5 pb-5 text-slate-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}
