interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`bg-white p-10 transition-all duration-500 hover:shadow-xl shadow-sm border border-[#354E41]/5 ${className}`}
    >
      {title && (
        <h3 className="text-[var(--green-dark)] font-semibold text-xl mb-4">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-[#555] text-sm leading-relaxed">{description}</p>
      )}

      {children}
    </div>
  );
}
