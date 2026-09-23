import { cn } from "@/lib/utils";
import type { Platform } from "@/data/platforms";

export function PlatformMark({ platform, size = "md" }: { platform: Platform; size?: "sm" | "md" | "lg" }) {
  return <span className={cn("platform-mark", `platform-${platform.accent}`, size === "sm" && "size-8 text-xs", size === "md" && "size-10 text-sm", size === "lg" && "size-14 text-lg")} aria-hidden="true">{platform.monogram}</span>;
}
