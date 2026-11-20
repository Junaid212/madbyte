import { budgets, serviceOptions, timelines } from "@/data/content";

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
  /** Honeypot. Must stay empty. */
  website?: string;
}
export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: Partial<ContactPayload>): ContactErrors {
  const e: ContactErrors = {};
  if (!v.name || v.name.trim().length < 2) e.name = "Tell us your name (at least 2 characters).";
  if (!v.email || !EMAIL.test(v.email.trim())) e.email = "Enter a valid email so we can reply.";
  if (!v.service || !(serviceOptions as readonly string[]).includes(v.service))
    e.service = "Choose the service closest to what you need.";
  if (!v.budget || !(budgets as readonly string[]).includes(v.budget))
    e.budget = "Pick a rough budget range. 'Not sure yet' is fine.";
  if (!v.timeline || !(timelines as readonly string[]).includes(v.timeline))
    e.timeline = "Pick a preferred timeline.";
  if (!v.details || v.details.trim().length < 20)
    e.details = "Give us a little more detail (at least 20 characters).";
  else if (v.details.length > 4000) e.details = "Keep it under 4,000 characters.";
  return e;
}
