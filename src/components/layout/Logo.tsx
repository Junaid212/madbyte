import { cn } from "@/lib/cn";

/**
 * MADBYTE logo mark. Rendered as a CSS mask over /logo-mask.png so it takes
 * the current text colour (ivory in the header, champagne in the footer).
 * Aspect ratio is 800:327. Size it with a width or height class.
 */
export function Logo({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="img"
      {...rest}
      aria-label="MADBYTE"
      className={cn("logo-mark inline-block aspect-[800/327] h-9 select-none bg-current", className)}
    />
  );
}
