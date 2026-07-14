import {
  NotebookPen,
  History,
  FileQuestion,
  CircleHelp,
  CircleUser,
  X,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar({ open, onClose }) {
  const menu = (
    <>
      <nav className="flex-1 space-y-2 p-4">
        <div onClick={onClose}>
          <SidebarItem icon={NotebookPen} label="Workspace" to="/workspace" />
        </div>

        <div onClick={onClose}>
          <SidebarItem icon={History} label="History" to="/history" />
        </div>

        <div onClick={onClose}>
          <SidebarItem icon={FileQuestion} label="Quiz" to="/quiz" />
        </div>
      </nav>

      <div className="p-4 space-y-2">
        <div onClick={onClose}>
          <SidebarItem icon={CircleHelp} label="Help" to="/faq" />
        </div>

        <div onClick={onClose}>
          <SidebarItem icon={CircleUser} label="Profile" to="/profile" />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}

      <aside
        className="
    hidden
    md:flex
    h-[calc(100vh-24px)]
    w-64
    flex-col
    m-3
    rounded-3xl
    bg-white
    shadow-lg
    shadow-slate-200/40
  "
      >
        <div className="px-7 pt-8 pb-6">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-slate-900">Note</span>
            <span className="text-blue-600">Flow</span>
          </h1>

          <p className="mt-1 text-sm text-slate-400">Study smarter with AI</p>
        </div>

        {menu}
      </aside>

      {/* Overlay */}

      {open && (
        <div
          onClick={onClose}
          className="
      fixed
      inset-0
      z-40
      bg-slate-900/30
      backdrop-blur-sm
      md:hidden
    "
        />
      )}

      {/* Mobile Drawer */}

      <aside
        className={`
    fixed
    top-3
    left-3
    bottom-3
    z-50

    w-[280px]

    rounded-3xl
    bg-white

    shadow-2xl
    shadow-slate-300/30

    transition-all
    duration-300
    ease-out

    md:hidden

    ${open ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"}
  `}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-6 pt-7 pb-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              <span className="text-slate-900">Note</span>

              <span className="text-blue-500">Flow</span>
            </h1>

            <p className="mt-1 text-sm text-slate-400">Study smarter with AI</p>
          </div>

          <button
            onClick={onClose}
            className="
        flex
        h-10
        w-10
        items-center
        justify-center

        rounded-xl

        transition-all
        duration-200

        hover:bg-slate-100
        active:scale-95
      "
          >
            <X size={20} strokeWidth={2.3} />
          </button>
        </div>

        <div className="h-px bg-slate-100 mx-5 mb-4" />

        {menu}
      </aside>
    </>
  );
}
