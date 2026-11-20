"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** next/link that plays the page curtain for internal navigation. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const navigate = usePageTransition();
  const internal = href.startsWith("/") && !href.startsWith("//");

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      !internal ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      rest.target === "_blank"
    )
      return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
