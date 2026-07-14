export default function IconButton({
  children,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white

        transition-all
        duration-200
        ease-out

        hover:-translate-y-0.5
        hover:shadow-md
        hover:border-blue-300
        hover:bg-blue-50

        active:translate-y-0
        active:scale-95

        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        disabled:hover:shadow-none

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
