import IconButton from "../ui/IconButton";

export default function ToolbarButton({
  icon: Icon,
  active = false,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <IconButton
      disabled={disabled}
      className={`
        ${
          active
            ? "bg-blue-600 border-blue-600 text-white shadow-md"
            : "text-slate-600 hover:text-blue-600"
        }

        ${className}
      `}
      {...props}
    >
      <Icon
        size={18}
        className={`
          transition-transform
          duration-200

          ${loading ? "animate-spin" : ""}
        `}
      />
    </IconButton>
  );
}
