import { useMemo } from "react";

const quotes = [
  "Knowledge grows when shared and practiced. 📚",
  "Small progress every day leads to big results. 🚀",
  "Stay curious, keep learning. 🌱",
  "Every note you write is an investment in yourself. ✨",
  "Learn today, lead tomorrow. 💡",
];

export default function GreetingSection({ name, learningPoint }) {
  const quote = useMemo(() => {
    if (learningPoint === 0) {
      return "Mulai kerjakan quiz pertamamu untuk mendapatkan Learning Points! 🚀";
    }

    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [learningPoint]);

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <h1 className="text-4xl font-bold text-slate-800">Halo, {name}! 👋</h1>

      <p className="mt-2 text-slate-500 italic">{quote}</p>
    </div>
  );
}
