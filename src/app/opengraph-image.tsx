import { ImageResponse } from "next/og";

export const alt = "MADBYTE: A Little Mad. A Lot Brilliant.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#182D4C",
          color: "#EFEFED",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          MAD<span style={{ fontWeight: 300 }}>BYTE</span>
          <div style={{ width: 14, height: 14, background: "#DEC6A6", marginLeft: 4 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span style={{ color: "#DEC6A6" }}>A LITTLE MAD.</span>
          <span>A LOT BRILLIANT.</span>
        </div>
        <div style={{ fontSize: 26, color: "#E3E5E7", letterSpacing: 4 }}>CREATIVE TECHNOLOGY &amp; DIGITAL TRANSFORMATION</div>
      </div>
    ),
    size,
  );
}
