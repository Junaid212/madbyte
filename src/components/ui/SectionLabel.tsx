import { cn } from "@/lib/cn";

export function SectionLabel({
  num,
  children,
  className,
}: {
  num?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("label flex items-center gap-3", className)}>
      {num && <span className="label-num text-champagne">{num}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
