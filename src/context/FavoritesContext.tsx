import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (breedName: string) => void;
  isFavorite: (breedName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("dogmatch-favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dogmatch-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (breedName: string) => {
    setFavorites(prev =>
      prev.includes(breedName)
        ? prev.filter(n => n !== breedName)
        : [...prev, breedName]
    );
  };

  const isFavorite = (breedName: string) => favorites.includes(breedName);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
