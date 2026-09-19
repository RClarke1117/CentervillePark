import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/65">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="focus-ring hover:text-white">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="focus-ring hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-white/90" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
