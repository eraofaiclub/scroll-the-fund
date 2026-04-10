"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  roundId: string;
  companyName: string;
}

export default function ShareButton({
  roundId,
  companyName,
}: ShareButtonProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const ogUrl = `${window.location.origin}/api/og?id=${encodeURIComponent(roundId)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${companyName} Funding Round — Scroll The Fund`,
          url: window.location.origin,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to download
      }
    }

    // Fallback: download the OG image
    try {
      const res = await fetch(ogUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${companyName.toLowerCase().replace(/\s+/g, "-")}-funding.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // silently fail
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label="Share"
    >
      <Share2 size={20} className="text-white/60 hover:text-white" />
    </button>
  );
}
