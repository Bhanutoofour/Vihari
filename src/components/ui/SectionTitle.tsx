interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = false,
}: Props) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2>{title}</h2>

      {subtitle && (
        <p className="italic text-[#888] text-lg mt-3">{subtitle}</p>
      )}
    </div>
  );
}
