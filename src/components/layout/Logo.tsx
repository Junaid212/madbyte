import { cn } from "@/lib/cn";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show the MADBYTE wordmark text beside the mark. */
  withText?: boolean;
  /** Classes for the wordmark text (size it here). */
  textClassName?: string;
}

/**
 * MADBYTE logo mark. Rendered as a CSS mask over /logo-mask.png so it takes
 * the current text colour. Aspect ratio is 800:327. `className` sizes the mark;
 * `withText` adds the MADBYTE wordmark beside it.
 */
export function Logo({ className, withText = false, textClassName, ...rest }: LogoProps) {
  const mark = (
    <span
      role={withText ? undefined : "img"}
      aria-label={withText ? undefined : "MADBYTE"}
      aria-hidden={withText ? true : undefined}
      {...(withText ? {} : rest)}
      className={cn("logo-mark inline-block aspect-[800/327] h-9 select-none bg-current", className)}
    />
  );
  if (!withText) return mark;
  return (
    <span className="inline-flex select-none items-center gap-2.5" {...rest}>
      {mark}
      <span className={cn("display text-[1.15rem] leading-none tracking-tight", textClassName)}>
        MAD<span className="font-light">BYTE</span>
      </span>
    </span>
  );
}
