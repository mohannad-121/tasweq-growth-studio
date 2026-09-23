import { cn } from "@/lib/utils";

export function BrandMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Tasweq">
      <span className="brand-glyph" aria-hidden="true"><i /><b>ت</b></span>
      {!compact && <span className="font-display text-lg font-bold text-foreground">Tasweq <span className="text-primary">/</span> تسويق</span>}
    </span>
  );
}
