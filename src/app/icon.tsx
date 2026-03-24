import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0F",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 18,
            border: "2px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: -1,
              color: "white",
              display: "flex",
              gap: 0,
            }}
          >
            <span>10</span>
            <span
              style={{
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              X
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

