"use client";

import { FundingRound } from "@/lib/types";
import Logo from "./Logo";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";
import { X, ExternalLink, Users, Calendar, TrendingUp } from "lucide-react";

function formatRoundType(rt: string): string {
  return rt
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount}`;
}

interface CardDetailProps {
  round: FundingRound;
  onClose: () => void;
}

export default function CardDetail({ round, onClose }: CardDetailProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] bg-gray-900 rounded-t-3xl sm:rounded-3xl overflow-y-auto border border-white/10 animate-slide-up"
      >
        {/* Handle bar (mobile) */}
        <div className="sm:hidden flex justify-center pt-3">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <Logo
              companyName={round.companyName}
              companyLogo={round.companyLogo}
              size={64}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-xl leading-tight">
                {round.companyName}
              </h2>
              <p className="text-white/50 text-sm mt-1">{round.oneLiner}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
            >
              <X size={20} className="text-white/60" />
            </button>
          </div>

          {/* Amount + Round */}
          <div className="bg-white/5 rounded-2xl p-5 mb-6">
            <p className="text-4xl font-black text-white">
              {round.amountFormatted}
            </p>
            <p className="text-white/50 text-sm mt-1">
              {formatRoundType(round.roundType)} &middot;{" "}
              {new Date(round.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {round.foundedYear && (
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Calendar size={16} className="text-white/40 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">
                  {round.foundedYear}
                </p>
                <p className="text-white/40 text-xs">Founded</p>
              </div>
            )}
            {round.teamSize && (
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Users size={16} className="text-white/40 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">
                  {round.teamSize}
                </p>
                <p className="text-white/40 text-xs">Team Size</p>
              </div>
            )}
            {round.totalRaised && (
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <TrendingUp size={16} className="text-white/40 mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">
                  {formatCurrency(round.totalRaised)}
                </p>
                <p className="text-white/40 text-xs">Total Raised</p>
              </div>
            )}
          </div>

          {/* Investors */}
          <div className="mb-6">
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              Investors
            </h3>
            {round.investors.length === 0 ? (
              <p className="text-white/40 text-sm italic">
                Undisclosed investors
              </p>
            ) : (
              <div className="space-y-2">
                {round.investors.map((inv, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-white/80 text-sm">{inv.name}</span>
                    {inv.lead && (
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                        Lead
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Previous Rounds */}
          {round.previousRounds && round.previousRounds.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
                Previous Rounds
              </h3>
              <div className="space-y-2">
                {round.previousRounds.map((pr, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                  >
                    <span className="text-white/60 text-sm">
                      {formatRoundType(pr.roundType)}
                    </span>
                    <div className="text-right">
                      <span className="text-white/80 text-sm font-medium">
                        {pr.amountFormatted}
                      </span>
                      <span className="text-white/30 text-xs ml-2">
                        {new Date(pr.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sectors */}
          <div className="flex flex-wrap gap-2 mb-6">
            {round.sector.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-lg bg-white/5 text-white/50 text-xs"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {round.website && (
              <a
                href={round.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-white text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} />
                Visit Website
              </a>
            )}
            <BookmarkButton roundId={round.id} />
            <ShareButton roundId={round.id} companyName={round.companyName} />
          </div>
        </div>
      </div>
    </div>
  );
}
