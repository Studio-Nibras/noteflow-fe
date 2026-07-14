export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-3xl bg-white p-7">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="mt-3 text-slate-600">{description}</p>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-xl border px-5 py-2">
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
