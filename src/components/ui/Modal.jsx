export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        overflow-y-auto
        bg-black/50
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-5
          shadow-2xl
          animate-in
          fade-in
          zoom-in
          duration-200
          sm:p-6
          lg:p-8
        "
      >
        <button
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            rounded-lg
            p-2
            text-slate-500
            transition
            hover:bg-slate-100
          "
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
