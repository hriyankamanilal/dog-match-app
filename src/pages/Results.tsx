import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateMatch, QuizAnswers } from "@/data/quiz-logic";
import { getBreedUrl, energyLabel, sheddingLabel } from "@/data/breeds";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Results() {
  const [params] = useSearchParams();

  const answers = useMemo<QuizAnswers>(() => ({
    homeType: (params.get("homeType") as QuizAnswers["homeType"]) || "apartment",
    homeSize: (params.get("homeSize") as QuizAnswers["homeSize"]) || "2br",
    activityLevel: (params.get("activityLevel") as QuizAnswers["activityLevel"]) || "one-walk",
    timeAtHome: (params.get("timeAtHome") as QuizAnswers["timeAtHome"]) || "some",
    experience: (params.get("experience") as QuizAnswers["experience"]) || "first-time",
    grooming: (params.get("grooming") as QuizAnswers["grooming"]) || "minimal",
    shedding: (params.get("shedding") as QuizAnswers["shedding"]) || "some",
    allergies: (params.get("allergies") as QuizAnswers["allergies"]) || "no",
    noise: (params.get("noise") as QuizAnswers["noise"]) || "moderate",
    vibe: (params.get("vibe") as QuizAnswers["vibe"]) || "balanced",
  }), [params]);

  const result = useMemo(() => calculateMatch(answers), [answers]);
  const { topMatch, runners } = result;

const topImg = topMatch.imageUrl;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-accent font-semibold uppercase tracking-widest text-sm mb-2">Your Match</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground">
              Meet your <span className="gradient-text">perfect match</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">Based on your lifestyle, home, and vibe</p>
          </div>

          {/* Top Match */}
          <div className="card-soft rounded-3xl overflow-hidden border-2 border-accent/40 shadow-glow-accent mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-72 md:h-auto">
                <img src={topImg} alt={topMatch.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-heading font-bold text-sm">
                  ⭐ #1 Match
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="font-heading font-black text-3xl text-foreground mb-1">{topMatch.name}</h2>
                  <p className="text-primary font-medium">{topMatch.group}</p>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{topMatch.temperament}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground">⚡ {energyLabel(topMatch.energyLevelValue)} energy</span>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground">🌪️ {sheddingLabel(topMatch.sheddingValue)} shedding</span>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground">📐 {topMatch.sizeCategory}</span>
                  {topMatch.isAllergyFriendly && <span className="text-xs px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent">🌿 Hypo</span>}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link to={getBreedUrl(topMatch)}>
                    <Button className="rounded-pill bg-accent text-accent-foreground font-heading font-semibold gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/adopt">
                    <Button variant="outline" className="rounded-pill border-primary/50 text-primary font-heading font-semibold gap-2">
                      <Heart className="w-4 h-4" /> Find Adoptable Dogs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Runners up */}
          <h3 className="font-heading font-bold text-xl text-foreground mb-4">Runners-up</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {runners.map((breed, i) => {
const topImg = topMatch.imageUrl;
              return (
                <Link key={breed.name} to={getBreedUrl(breed)} className="group">
                  <div className="card-soft rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:-translate-y-1 flex gap-4 p-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                      <img src={img} alt={breed.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">#{i + 2} Runner-up</div>
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{breed.name}</h4>
                      <p className="text-muted-foreground text-xs">{breed.temperament.split(",")[0]}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Adoption CTA */}
          <div className="card-soft rounded-2xl p-8 border border-accent/30 bg-accent/5 text-center">
            <div className="text-4xl mb-3">🏡</div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">These are real dogs waiting for a home</h3>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto text-sm">
              We found your breed match — now see adoptable dogs with similar traits near you. They're available right now.
            </p>
            <Link to="/adopt">
              <Button className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold px-10 shadow-glow-accent gap-2">
                <Heart className="w-4 h-4" /> See Adoptable Dogs Near You
              </Button>
            </Link>
          </div>

          <div className="flex justify-center mt-8">
            <Link to="/quiz">
              <Button variant="ghost" className="rounded-pill text-muted-foreground gap-2">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
