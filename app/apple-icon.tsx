import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
          borderRadius: 36,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", width: 84, height: 84, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 84, background: "#F7F7F6" }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 16, height: 84, background: "#F7F7F6" }} />
          <div style={{ position: "absolute", left: 0, top: 34, width: 84, height: 16, background: "#F7F7F6" }} />
        </div>
        <div
          style={{
            position: "absolute",
            right: 22,
            bottom: 22,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#7A2E3A",
          }}
        />
      </div>
    ),
    size
  );
}
