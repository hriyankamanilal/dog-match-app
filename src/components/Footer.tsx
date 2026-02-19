import { Link } from "react-router-dom";
import { PawPrint, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-heading font-bold text-xl mb-3">
              <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                <PawPrint className="w-3.5 h-3.5 text-accent-foreground" />
              </div>
              <span>Dog<span className="text-accent">Match</span></span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              We're a guide, not a guarantee — every dog is an individual. Meet them, love them, learn them.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-3">
              Breed traits are tendencies, not guarantees.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-foreground">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/breeds" className="hover:text-accent transition-colors">Browse Breeds</Link></li>
              <li><Link to="/quiz" className="hover:text-accent transition-colors">Take the Quiz</Link></li>
              <li><Link to="/adopt" className="hover:text-accent transition-colors">Adopt a Dog</Link></li>
              <li><Link to="/#about" className="hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Adoption */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-foreground">Adoption Partners</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://www.petfinder.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                  Petfinder <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.adoptapet.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                  Adopt-a-Pet <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.aspca.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                  ASPCA <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/60">
          <p>© 2025 DogMatch. Made with <Heart className="w-3 h-3 inline text-accent" /> for dogs and the humans who love them.</p>
          <p>Adopt, don't shop — always.</p>
        </div>
      </div>
    </footer>
  );
}
