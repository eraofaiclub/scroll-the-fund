import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getRoundById } from "@/lib/data";

export const runtime = "edge";

function hashColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 45%)`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatRoundType(rt: string): string {
  return rt
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing id parameter", { status: 400 });
  }

  const round = getRoundById(id);
  if (!round) {
    return new Response("Round not found", { status: 404 });
  }

  const leadInvestor = round.investors.find((i) => i.lead);
  const bgColor = hashColor(round.companyName);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: bgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            {getInitials(round.companyName)}
          </div>

          {/* Company Name */}
          <div
            style={{
              color: "white",
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            {round.companyName}
          </div>

          {/* One-liner */}
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "18px",
              marginBottom: "32px",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            {round.oneLiner}
          </div>

          {/* Amount */}
          <div
            style={{
              color: "white",
              fontSize: "72px",
              fontWeight: "900",
              letterSpacing: "-2px",
              marginBottom: "12px",
            }}
          >
            {round.amountFormatted}
          </div>

          {/* Round Type */}
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "20px",
              marginBottom: "24px",
            }}
          >
            {formatRoundType(round.roundType)}
            {leadInvestor ? ` · Led by ${leadInvestor.name}` : ""}
          </div>

          {/* Branding */}
          <div
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "14px",
              marginTop: "16px",
            }}
          >
            Scroll The Fund
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
