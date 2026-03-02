import { Link } from "react-router-dom";
import { X, GitCompare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <GitCompare className="w-4 h-4 text-primary" />
            Compare
          </div>

          {/* Selected breeds */}
          <div className="flex items-center gap-3 flex-1">
            {compareList.map(breed => (
              <div
                key={breed.name}
                className="flex items-center gap-2 bg-muted border border-border rounded-full px-3 py-1.5"
              >
                <img
                  src={breed.imageUrl}
                  alt={breed.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-foreground">{breed.name}</span>
                <button
                  onClick={() => removeFromCompare(breed.name)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Empty slot */}
            {compareList.length === 1 && (
              <div className="flex items-center gap-2 border-2 border-dashed border-border rounded-full px-3 py-1.5 text-muted-foreground text-sm">
                <Plus className="w-3.5 h-3.5" />
                Add one more breed
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={clearCompare}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
            {compareList.length === 2 && (
              <Link to={`/compare?breed1=${encodeURIComponent(compareList[0].name)}&breed2=${encodeURIComponent(compareList[1].name)}`}>
                <Button className="rounded-pill bg-primary text-primary-foreground font-heading font-semibold gap-2 text-sm px-5">
                  <GitCompare className="w-4 h-4" />
                  Compare Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
