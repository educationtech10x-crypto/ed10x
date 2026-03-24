import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0B0B0F",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              border: "2px solid rgba(255,255,255,0.12)",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.28), rgba(139,92,246,0.28))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: -1,
            }}
          >
            10X
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: -1,
              gap: 0,
            }}
          >
            <span>ED</span>
            <span
              style={{
                color: "transparent",
                background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                WebkitBackgroundClip: "text",
              }}
            >
              10X
            </span>
            <span>.com</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            <span>10X Your Reach.</span>
            <span
              style={{
                color: "transparent",
                background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                WebkitBackgroundClip: "text",
              }}
            >
              Digitally.
            </span>
          </div>
          <div style={{ marginTop: 22, fontSize: 28, color: "rgba(255,255,255,0.72)" }}>
            Campus • Local networks • Instagram • Google • Hybrid campaigns
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              padding: "14px 20px",
              borderRadius: 999,
              background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Start Campaign
          </div>
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>
            Fast • Affordable • Execution-focused
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

