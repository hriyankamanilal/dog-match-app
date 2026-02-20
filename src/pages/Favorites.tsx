import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { breeds } from "@/data/breeds";
import BreedCard from "@/components/BreedCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Favorites() {
  const { favorites } = useFavorites();
  const favoriteBreeds = breeds.filter(b => favorites.includes(b.name));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent mb-4">
              <PawPrint className="w-3.5 h-3.5" />
              <span>Your saved breeds</span>
            </div>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-3">
              My <span className="gradient-text">Favorites</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {favoriteBreeds.length > 0
                ? `You've saved ${favoriteBreeds.length} breed${favoriteBreeds.length === 1 ? "" : "s"}`
                : "No favorites yet — start exploring!"}
            </p>
          </div>

          {favoriteBreeds.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐾</div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-3">No favorites yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Browse breeds and tap the paw icon to save your favorites here.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/breeds">
                  <Button className="rounded-pill bg-accent text-accent-foreground font-heading font-semibold gap-2">
                    Browse Breeds
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button variant="outline" className="rounded-pill border-primary/50 text-primary font-heading font-semibold gap-2">
                    Take the Quiz
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {favoriteBreeds.map(breed => (
                  <BreedCard key={breed.name} breed={breed} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to="/breeds">
                  <Button variant="outline" className="rounded-pill border-primary/50 text-primary font-heading font-semibold gap-2">
                    Browse More Breeds
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
