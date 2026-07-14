export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
