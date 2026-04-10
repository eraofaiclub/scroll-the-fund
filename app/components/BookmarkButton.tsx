"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  roundId: string;
}

export default function BookmarkButton({ roundId }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(roundId));
  }, [roundId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = toggleBookmark(roundId);
    setSaved(result);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label={saved ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        size={20}
        className={
          saved
            ? "fill-yellow-400 text-yellow-400"
            : "text-white/60 hover:text-white"
        }
      />
    </button>
  );
}
