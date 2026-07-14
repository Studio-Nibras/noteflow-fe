export default function Divider({ vertical = false }) {
  if (vertical) {
    return <div className="h-6 w-px bg-slate-200" />;
  }

  return <hr className="border-slate-200" />;
}
