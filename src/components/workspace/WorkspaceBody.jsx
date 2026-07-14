import NoteEditor from "../editor/NoteEditor";

export default function WorkspaceBody({ editor }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto h-full max-w-4xl px-8 py-6">
        <NoteEditor editor={editor} />
      </div>
    </main>
  );
}
