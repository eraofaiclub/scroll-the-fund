"use client";

import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { useFilters } from "@/lib/context";
import { RoundType } from "@/lib/types";
import { hasActiveFilters } from "@/lib/filters";
import { getAllRoundTypes, getAllSectors } from "@/lib/data";

const ROUND_TYPES = getAllRoundTypes() as RoundType[];
const SECTORS = getAllSectors();

const AMOUNT_RANGES = [
  { label: "Any", min: null, max: null },
  { label: "<$5M", min: null, max: 5_000_000 },
  { label: "$5M–$25M", min: 5_000_000, max: 25_000_000 },
  { label: "$25M–$100M", min: 25_000_000, max: 100_000_000 },
  { label: "$100M+", min: 100_000_000, max: null },
];

function formatRoundType(rt: string): string {
  return rt
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function FilterBar() {
  const [open, setOpen] = useState(false);
  const { filters, toggleRoundType, toggleSector, setAmountRange, clearFilters } =
    useFilters();
  const active = hasActiveFilters(filters);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          active
            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
        }`}
      >
        <Filter size={14} />
        Filters
        {active && (
          <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {filters.roundTypes.length + filters.sectors.length + (filters.amountMin !== null || filters.amountMax !== null ? 1 : 0)}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 rounded-2xl border border-white/10 shadow-2xl p-4 z-40 animate-fade-in">
          {/* Round Type */}
          <div className="mb-4">
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
              Round Type
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {ROUND_TYPES.map((rt) => (
                <button
                  key={rt}
                  onClick={() => toggleRoundType(rt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filters.roundTypes.includes(rt)
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {formatRoundType(rt)}
                </button>
              ))}
            </div>
          </div>

          {/* Sector */}
          <div className="mb-4">
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
              Sector
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSector(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filters.sectors.includes(s)
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Range */}
          <div className="mb-4">
            <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
              Amount
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {AMOUNT_RANGES.map((range) => {
                const isActive =
                  filters.amountMin === range.min &&
                  filters.amountMax === range.max;
                return (
                  <button
                    key={range.label}
                    onClick={() => setAmountRange(range.min, range.max)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear */}
          {active && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/60 text-xs transition-colors"
            >
              <X size={12} />
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
