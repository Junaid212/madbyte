"use client";

import { useSyncExternalStore } from "react";

const query = "(hover: hover) and (pointer: fine)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** True on devices with a precision pointer (mouse / trackpad). SSR-safe. */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
