"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FundingRound } from "@/lib/types";
import { useFilters } from "@/lib/context";
import { applyFilters, hasActiveFilters } from "@/lib/filters";
import FundingCard from "./FundingCard";
import CardDetail from "./CardDetail";
import { SearchX } from "lucide-react";

const BATCH_SIZE = 10;

interface CardFeedProps {
  allRounds: FundingRound[];
}

export default function CardFeed({ allRounds }: CardFeedProps) {
  const { filters, clearFilters } = useFilters();
  const [selected, setSelected] = useState<FundingRound | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const filtered = applyFilters(allRounds, filters);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [filters]);

  // Intersection Observer for lazy loading
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) => prev + BATCH_SIZE);
          }
        },
        { threshold: 0.1 }
      );

      if (node) observerRef.current.observe(node);
    },
    [hasMore]
  );

  if (filtered.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <SearchX size={48} className="text-white/20 mb-4" />
        <p className="text-white/50 text-lg font-medium mb-2">
          No rounds match
        </p>
        <p className="text-white/30 text-sm mb-4">
          Try adjusting your filters
        </p>
        {hasActiveFilters(filters) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-white/70 text-sm transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {visible.map((round, i) => (
          <div
            key={round.id}
            ref={i === visible.length - 1 ? lastCardRef : undefined}
            className="h-[calc(100dvh-64px)] min-h-[500px]"
          >
            <FundingCard round={round} onClick={() => setSelected(round)} />
          </div>
        ))}
      </div>

      {selected && (
        <CardDetail round={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
