/**
 * Home-page section theme switch (code only, nothing shows on the site).
 *
 * Flip THEME_MODE to change Featured Work, Process and Testimonials together:
 *   "original" -> each section keeps its own colours (see ORIGINAL_TONES)
 *   "light"    -> all three sections use the light theme
 *
 * To restyle a single section in "original" mode, change its value in
 * ORIGINAL_TONES to "light" or "dark".
 */
export type Tone = "light" | "dark";

export const THEME_MODE = "original" as "original" | "light";

export const ORIGINAL_TONES: Record<SectionKey, Tone> = {
  featuredWork: "light",
  process: "light",
  testimonials: "light",
};

export type SectionKey = "featuredWork" | "process" | "testimonials";

export const sectionTone = (key: SectionKey): Tone =>
  THEME_MODE === "light" ? "light" : ORIGINAL_TONES[key];
