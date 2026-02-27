import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "dark";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300";

  const styles = {
    primary: "bg-[#D9B59D] text-[#354E41] hover:bg-white hover:text-[#354E41]",
    outline:
      "border border-[#354E41] text-[#354E41] hover:bg-[#354E41] hover:text-white",
    dark: "border border-white text-white hover:bg-white hover:text-[#354E41]",
  };

  const classes = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
