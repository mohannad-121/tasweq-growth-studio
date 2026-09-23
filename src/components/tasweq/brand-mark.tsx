import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn("brand-mark", compact && "brand-mark-compact", className)}
      aria-label="Tasweq"
    >
      <img src="/logo.jpg" alt="Tasweq" />
    </span>
  );
}
