"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, ArrowUpRight, AlertTriangle } from "lucide-react";
import { budgets, serviceOptions, timelines } from "@/data/content";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { validateContact, type ContactErrors, type ContactPayload } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "not_configured" | "error";

const empty: ContactPayload = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  details: "",
  website: "",
};

const preset: Record<string, string> = {
  build: "MADBYTE BUILD",
  design: "MADBYTE DESIGN",
  create: "MADBYTE CREATE",
  grow: "MADBYTE GROW",
};

const field =
  "w-full border-0 border-b border-ivory/30 bg-transparent px-0 py-3 text-lg text-ivory placeholder:text-ivory/40 transition-colors focus:border-champagne focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-300";

function ErrorText({ k, msg }: { k: string; msg?: string }) {
  return msg ? (
    <p id={`${k}-error`} className="mt-2 text-sm text-red-200">
      {msg}
    </p>
  ) : null;
}

export function ContactForm() {
  const params = useSearchParams();
  const presetService = preset[params.get("service") ?? ""] ?? "";
  const [values, setValues] = useState<ContactPayload>({ ...empty, service: presetService });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof ContactPayload, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const blur = (k: keyof ContactPayload) => {
    const err = validateContact(values)[k];
    setErrors((e) => ({ ...e, [k]: err }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof ContactPayload)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ ...empty });
      } else if (res.status === 501) {
        setStatus("not_configured");
      } else if (res.status === 422) {
        const data = (await res.json()) as { errors?: ContactErrors };
        setErrors(data.errors ?? {});
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const errCount = Object.values(errors).filter(Boolean).length;
  const err = (k: keyof ContactPayload) => errors[k];
  const describe = (k: keyof ContactPayload) => (err(k) ? `${k}-error` : undefined);

  if (status === "success") {
    return (
      <div role="status" className="py-10">
        <span className="grid size-16 place-items-center rounded-full bg-champagne text-navy">
          <Check aria-hidden className="size-7" />
        </span>
        <h3 className="display mt-8 text-big">Message sent.</h3>
        <p className="mt-4 max-w-md text-lead text-ivory/80">
          Thanks. We read every enquiry personally and usually reply within two working days.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="u-link mt-8 text-sm font-semibold">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-10">
      {errCount > 0 && (
        <div role="alert" className="flex gap-3 border border-red-300/60 p-4 text-sm text-red-100">
          <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>
            Please fix {errCount} {errCount === 1 ? "field" : "fields"} below and try again.
          </p>
        </div>
      )}

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label text-champagne">Your name *</label>
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} aria-invalid={!!err("name")} aria-describedby={describe("name")} aria-required className={field} placeholder="Ada Lovelace" />
          <ErrorText k="name" msg={err("name")} />
        </div>
        <div>
          <label htmlFor="email" className="label text-champagne">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} aria-invalid={!!err("email")} aria-describedby={describe("email")} aria-required className={field} placeholder="ada@company.com" />
          <ErrorText k="email" msg={err("email")} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="label text-champagne">Company <span className="text-ivory/50">(optional)</span></label>
        <input id="company" name="company" autoComplete="organization" value={values.company} onChange={(e) => set("company", e.target.value)} className={field} placeholder="Where do you work?" />
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {(
          [
            ["service", "Service needed *", serviceOptions],
            ["budget", "Estimated budget *", budgets],
            ["timeline", "Preferred timeline *", timelines],
          ] as const
        ).map(([k, label, options]) => (
          <div key={k}>
            <label htmlFor={k} className="label text-champagne">{label}</label>
            <select
              id={k}
              name={k}
              value={values[k]}
              onChange={(e) => set(k, e.target.value)}
              onBlur={() => blur(k)}
              aria-invalid={!!err(k)}
              aria-describedby={describe(k)}
              aria-required
              className={cn(field, "appearance-none bg-navy", !values[k] && "text-ivory/40")}
            >
              <option value="">Select…</option>
              {options.map((o) => (
                <option key={o} value={o} className="bg-navy text-ivory">
                  {o}
                </option>
              ))}
            </select>
            <ErrorText k={k} msg={err(k)} />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="details" className="label text-champagne">Tell us about the project *</label>
        <textarea id="details" name="details" rows={5} value={values.details} onChange={(e) => set("details", e.target.value)} onBlur={() => blur("details")} aria-invalid={!!err("details")} aria-describedby={describe("details")} aria-required className={cn(field, "resize-y")} placeholder="What are you building, what's not working, what would a great outcome look like?" />
        <ErrorText k="details" msg={err("details")} />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex min-w-[15rem] items-center justify-center gap-3 overflow-hidden rounded-full bg-champagne px-9 py-5 text-base font-semibold text-navy transition-colors duration-300 hover:bg-ivory disabled:cursor-wait"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-3"
            >
              {status === "sending" ? (
                <>
                  <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <p className="max-w-xs text-sm text-ivory/60">
          We only use your details to reply to this enquiry.
        </p>
      </div>

      <div aria-live="polite">
        {status === "not_configured" && (
          <div role="alert" className="border border-champagne/60 p-5 text-sm">
            <p className="font-semibold text-champagne">This form isn&apos;t connected to an inbox yet.</p>
            <p className="mt-2 text-ivory/80">
              Your message was valid but nothing was sent or stored. Please email us directly at{" "}
              <a className="u-link" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        )}
        {status === "error" && (
          <div role="alert" className="border border-red-300/60 p-5 text-sm text-red-100">
            <p className="font-semibold">Something went wrong.</p>
            <p className="mt-2">
              Your message didn&apos;t go through. Please try again, or email{" "}
              <a className="u-link" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
