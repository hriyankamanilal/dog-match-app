import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Index from "./pages/Index";
import Breeds from "./pages/Breeds";
import BreedDetail from "./pages/BreedDetail";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Adopt from "./pages/Adopt";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/breeds" element={<Breeds />} />
            <Route path="/breeds/:id" element={<BreedDetail />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FavoritesProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
