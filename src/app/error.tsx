"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-svh items-center bg-navy pb-20 pt-36 text-ivory">
      <div className="container-x">
        <p className="label text-champagne">Something broke</p>
        <h1 className="display mt-6 text-huge">That wasn&apos;t supposed to happen.</h1>
        <p className="mt-6 max-w-md text-lead text-ivory/80">
          An unexpected error stopped this page loading. Try again, and if it persists, let us know.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-navy transition-colors hover:bg-ivory"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
