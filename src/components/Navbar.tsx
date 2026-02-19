import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Browse Breeds", href: "/breeds" },
  { label: "Quiz", href: "/quiz" },
  { label: "Adopt", href: "/adopt" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
                location.pathname === link.href
                  ? "text-accent"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/quiz">
            <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold px-5 shadow-glow-accent">
              Take the Quiz
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
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
