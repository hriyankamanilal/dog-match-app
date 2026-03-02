import { createContext, useContext, useState, ReactNode } from "react";
import { Breed } from "@/data/breeds";

interface CompareContextType {
  compareList: Breed[];
  addToCompare: (breed: Breed) => void;
  removeFromCompare: (breedName: string) => void;
  isInCompare: (breedName: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType>({
  compareList: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  isInCompare: () => false,
  clearCompare: () => {},
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Breed[]>([]);

  const addToCompare = (breed: Breed) => {
    setCompareList(prev => {
      if (prev.find(b => b.name === breed.name)) return prev;
      if (prev.length >= 2) return prev;
      return [...prev, breed];
    });
  };

  const removeFromCompare = (breedName: string) => {
    setCompareList(prev => prev.filter(b => b.name !== breedName));
  };

  const isInCompare = (breedName: string) => {
    return compareList.some(b => b.name === breedName);
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
