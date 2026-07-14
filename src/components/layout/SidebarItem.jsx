import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group
        flex
        items-center
        gap-3
        rounded-2xl
        px-4
        py-3
        font-medium
        transition-all
        duration-200

        ${
          isActive
            ? `
              bg-linear-to-r 
              from-blue-600 
              to-cyan-500
              text-white
              shadow-lg
              shadow-violet-500/25
            `
            : `
              text-slate-600
              hover:bg-slate-100
              hover:text-slate-900
              hover:translate-x-1
            `
        }
      `
      }
    >
      <Icon size={20} strokeWidth={2.2} />

      <span className="tracking-wide">{label}</span>
    </NavLink>
  );
}
