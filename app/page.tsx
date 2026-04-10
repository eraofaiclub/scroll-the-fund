import { getAllRounds } from "@/lib/data";
import { FilterProvider } from "@/lib/context";
import CardFeed from "./components/CardFeed";
import FilterBar from "./components/FilterBar";
import { TrendingUp } from "lucide-react";

export default function Home() {
  const rounds = getAllRounds();

  return (
    <FilterProvider>
      <div className="h-dvh flex flex-col bg-black overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" />
            <h1 className="text-white font-bold text-base tracking-tight">
              Scroll The Fund
            </h1>
          </div>
          <FilterBar />
        </header>

        {/* Feed */}
        <CardFeed allRounds={rounds} />
      </div>
    </FilterProvider>
  );
}
