export default function WorkspaceHeader({ currentNote, setCurrentNote }) {
  return (
    <header className="flex h-16 items-center border-b border-slate-200 px-6">
      <input
        type="text"
        placeholder="Untitled Note"
        value={currentNote.title}
        onChange={(e) =>
          setCurrentNote((prev) => ({
            ...prev,
            title: e.target.value,
            updatedAt: new Date().toISOString(),
          }))
        }
        className="
          w-full
          bg-transparent
          text-2xl
          font-bold
          outline-none
          placeholder:text-slate-400
        "
      />
    </header>
  );
}
