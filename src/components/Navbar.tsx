import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";

const navLinks = [
  { label: "Browse Breeds", href: "/breeds" },
  { label: "Quiz", href: "/quiz" },
  { label: "Adopt", href: "/adopt" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <PawPrint className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="text-foreground">Dog<span className="text-accent">Match</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA + Favorites */}
        <div className="hidden md:flex items-center gap-3">
          {/* Favorites icon */}
          <Link to="/favorites" className="relative p-2 rounded-full hover:bg-accent/10 transition-colors group">
            <PawPrint className={`w-5 h-5 transition-colors ${location.pathname === "/favorites" ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length > 9 ? "9+" : favorites.length}
              </span>
            )}
          </Link>
          <Link to="/quiz">
            <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold px-5 shadow-glow-accent">
              Take the Quiz
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/favorites" className="relative p-2 rounded-full hover:bg-accent/10 transition-colors">
            <PawPrint className="w-5 h-5 text-muted-foreground" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length > 9 ? "9+" : favorites.length}
              </span>
            )}
          </Link>
          <button
            className="text-foreground p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block py-2 text-muted-foreground hover:text-accent font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/favorites" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2 text-muted-foreground hover:text-accent font-medium transition-colors">
              <PawPrint className="w-4 h-4" />
              Favorites
              {favorites.length > 0 && (
                <span className="bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </div>
          </Link>
          <Link to="/quiz" onClick={() => setOpen(false)}>
            <Button className="w-full rounded-pill bg-accent text-accent-foreground font-heading font-semibold mt-2">
              Take the Quiz
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
