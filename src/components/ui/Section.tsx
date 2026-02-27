interface Props {
  children: React.ReactNode;
  background?: string;
  className?: string;
}

export default function Section({
  children,
  background = "bg-white",
  className = "",
}: Props) {
  return (
    <section className={`py-24 ${background} ${className}`}>{children}</section>
  );
}
