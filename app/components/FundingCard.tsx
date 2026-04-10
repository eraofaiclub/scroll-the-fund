"use client";

import { FundingRound } from "@/lib/types";
import Logo from "./Logo";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";

const roundTypeColors: Record<string, string> = {
  "pre-seed": "bg-violet-500/20 text-violet-300",
  seed: "bg-emerald-500/20 text-emerald-300",
  "series-a": "bg-blue-500/20 text-blue-300",
  "series-b": "bg-orange-500/20 text-orange-300",
  "series-c": "bg-pink-500/20 text-pink-300",
  "series-d": "bg-red-500/20 text-red-300",
  growth: "bg-amber-500/20 text-amber-300",
};

function formatRoundType(rt: string): string {
  return rt
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

interface FundingCardProps {
  round: FundingRound;
  onClick: () => void;
}

export default function FundingCard({ round, onClick }: FundingCardProps) {
  const leadInvestor = round.investors.find((i) => i.lead);
  const otherInvestors = round.investors.filter((i) => !i.lead);

  return (
    <div
      onClick={onClick}
      className="w-full h-full snap-start snap-always flex items-center justify-center p-4 cursor-pointer"
    >
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border border-white/5 transition-transform active:scale-[0.98]">
        {/* Header: Logo + Name + Actions */}
        <div className="flex items-start gap-4 mb-5">
          <Logo
            companyName={round.companyName}
            companyLogo={round.companyLogo}
            size={52}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
              {round.companyName}
            </h2>
            <p className="text-white/50 text-sm mt-0.5">{timeAgo(round.date)}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <BookmarkButton roundId={round.id} />
            <ShareButton roundId={round.id} companyName={round.companyName} />
          </div>
        </div>

        {/* One-liner */}
        <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-2">
          {round.oneLiner}
        </p>

        {/* Amount — hero number */}
        <div className="mb-5">
          <p className="text-5xl font-black text-white tracking-tight">
            {round.amountFormatted}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${roundTypeColors[round.roundType] || "bg-gray-500/20 text-gray-300"}`}
          >
            {formatRoundType(round.roundType)}
          </span>
        </div>

        {/* Investors */}
        <div className="mb-5">
          {leadInvestor && (
            <p className="text-white/90 text-sm font-medium">
              {leadInvestor.name}
              <span className="text-white/40 ml-1.5 text-xs">Lead</span>
            </p>
          )}
          {otherInvestors.length > 0 && (
            <p className="text-white/50 text-xs mt-1">
              {otherInvestors.length === 0
                ? null
                : otherInvestors.length <= 3
                  ? otherInvestors.map((i) => i.name).join(", ")
                  : `${otherInvestors.slice(0, 2).map((i) => i.name).join(", ")} +${otherInvestors.length - 2} more`}
            </p>
          )}
          {round.investors.length === 0 && (
            <p className="text-white/40 text-sm italic">
              Undisclosed investors
            </p>
          )}
        </div>

        {/* Sector tags */}
        <div className="flex flex-wrap gap-2">
          {round.sector.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 rounded-md bg-white/5 text-white/50 text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
