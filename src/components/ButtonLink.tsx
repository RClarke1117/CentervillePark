import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "foundation";
  className?: string;
  external?: boolean;
};

const styles = {
  primary:
    "bg-gold text-forest-deep hover:bg-gold-bright shadow-[0_10px_30px_rgba(212,160,23,0.25)]",
  secondary:
    "bg-white/15 text-white border border-white/40 hover:bg-white/25 backdrop-blur-sm",
  ghost:
    "bg-transparent text-forest border border-forest/25 hover:border-forest/50 hover:bg-mist",
  foundation:
    "bg-foundation text-white hover:bg-[#274f7a]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: Props) {
  const cls = `focus-ring inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold tracking-wide transition ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
