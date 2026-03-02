import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Trophy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBreedById, getBreedUrl } from "@/data/breeds";
import { calculateMatch, QuizAnswers } from "@/data/quiz-logic";
import { useQuizTaken } from "@/hooks/useQuizTaken";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function toDogCeoBreed(name: string): string | null {
  const map: Record<string, string> = {
    "Affenpinscher": "affenpinscher",
    "Afghan Hound": "hound/afghan",
    "Airedale Terrier": "terrier/airedale",
    "Akita": "akita",
    "Alaskan Malamute": "malamute",
    "Australian Cattle Dog": "cattledog/australian",
    "Australian Shepherd": "australian/shepherd",
    "Australian Terrier": "terrier/australian",
    "Basenji": "basenji",
    "Basset Hound": "hound/basset",
    "Beagle": "beagle",
    "Belgian Malinois": "malinois",
    "Bernese Mountain Dog": "mountain/bernese",
    "Bichon Frise": "bichon",
    "Bloodhound": "hound/blood",
    "Border Collie": "collie/border",
    "Border Terrier": "terrier/border",
    "Boston Terrier": "terrier/boston",
    "Boxer": "boxer",
    "Bull Terrier": "terrier/bull",
    "Cairn Terrier": "terrier/cairn",
    "Cardigan Welsh Corgi": "corgi/cardigan",
    "Cavalier King Charles Spaniel": "spaniel/cocker",
    "Chihuahua": "chihuahua",
    "Chow Chow": "chow",
    "Cocker Spaniel": "spaniel/cocker",
    "Collie": "collie/border",
    "Dachshund": "dachshund",
    "Dalmatian": "dalmatian",
    "Doberman Pinscher": "doberman",
    "English Springer Spaniel": "spaniel/springer",
    "French Bulldog": "bulldog/french",
    "German Shepherd Dog": "germanshepherd",
    "German Shorthaired Pointer": "pointer/germanlonghair",
    "Golden Retriever": "retriever/golden",
    "Great Dane": "dane/great",
    "Greyhound": "greyhound/italian",
    "Havanese": "havanese",
    "Irish Setter": "setter/irish",
    "Irish Wolfhound": "wolfhound/irish",
    "Italian Greyhound": "greyhound/italian",
    "Labrador Retriever": "labrador",
    "Maltese": "maltese",
    "Mastiff": "mastiff",
    "Miniature Pinscher": "pinscher/miniature",
    "Miniature Schnauzer": "schnauzer/miniature",
    "Newfoundland": "newfoundland",
    "Papillon": "papillon",
    "Pembroke Welsh Corgi": "corgi/cardigan",
    "Pomeranian": "pomeranian",
    "Poodle": "poodle/standard",
    "Poodle (Miniature)": "poodle/miniature",
    "Poodle (Standard)": "poodle/standard",
    "Poodle (Toy)": "poodle/toy",
    "Pug": "pug",
    "Rhodesian Ridgeback": "ridgeback/rhodesian",
    "Rottweiler": "rottweiler",
    "Saint Bernard": "stbernard",
    "Samoyed": "samoyed",
    "Scottish Terrier": "terrier/scottish",
    "Shetland Sheepdog": "sheepdog/shetland",
    "Shiba Inu": "shiba",
    "Shih Tzu": "shihtzu",
    "Siberian Husky": "husky",
    "Vizsla": "vizsla",
    "Weimaraner": "weimaraner",
    "West Highland White Terrier": "terrier/westhighland",
    "Whippet": "whippet",
    "Yorkshire Terrier": "terrier/yorkshire",
  };
  return map[name] || null;
}

function useBreedPhoto(breedName: string, fallback: string) {
  const [photo, setPhoto] = useState(fallback);
  useEffect(() => {
    const slug = toDogCeoBreed(breedName);
    if (!slug) return;
    fetch(`https://dog.ceo/api/breed/${slug}/images/random`)
      .then(r => r.json())
      .then(data => { if (data.status === "success") setPhoto(data.message); })
      .catch(() => {});
  }, [breedName]);
  return photo;
}

function StatRow({ label, val1, val2, higherIsBetter = true }: {
  label: string;
  val1: number;
  val2: number;
  higherIsBetter?: boolean;
}) {
  const pct1 = Math.round(val1 * 100);
  const pct2 = Math.round(val2 * 100);
  const breed1Wins = higherIsBetter ? val1 > val2 : val1 < val2;
  const breed2Wins = higherIsBetter ? val2 > val1 : val2 < val1;

  return (
    <div className="grid grid-cols-[1fr_120px_1fr] gap-3 items-center py-3 border-b border-border last:border-0">
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{pct1}%</span>
          {breed1Wins && <Trophy className="w-3 h-3 text-accent" />}
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${breed1Wins ? "bg-accent" : "bg-primary/50"}`} style={{ width: `${pct1}%` }} />
        </div>
      </div>
      <div className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground flex-row-reverse">
          <span>{pct2}%</span>
          {breed2Wins && <Trophy className="w-3 h-3 text-accent" />}
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden flex justify-end">
          <div className={`h-full rounded-full transition-all duration-700 ${breed2Wins ? "bg-accent" : "bg-primary/50"}`} style={{ width: `${pct2}%` }} />
        </div>
      </div>
    </div>
  );
}

function BoolRow({ label, val1, val2 }: { label: string; val1: boolean; val2: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_120px_1fr] gap-3 items-center py-3 border-b border-border last:border-0">
      <div className="flex justify-start">
        {val1
          ? <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check className="w-4 h-4" /> Yes</span>
          : <span className="flex items-center gap-1 text-sm text-muted-foreground"><X className="w-4 h-4" /> No</span>}
      </div>
      <div className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="flex justify-end">
        {val2
          ? <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check className="w-4 h-4" /> Yes</span>
          : <span className="flex items-center gap-1 text-sm text-muted-foreground"><X className="w-4 h-4" /> No</span>}
      </div>
    </div>
  );
}

export default function Compare() {
  const [params] = useSearchParams();
  const quizTaken = useQuizTaken();
  const breed1Name = params.get("breed1") || "";
  const breed2Name = params.get("breed2") || "";

  const breed1 = getBreedById(breed1Name.toLowerCase().replace(/\s+/g, "-"));
  const breed2 = getBreedById(breed2Name.toLowerCase().replace(/\s+/g, "-"));

  const photo1 = useBreedPhoto(breed1?.name || "", breed1?.imageUrl || "");
  const photo2 = useBreedPhoto(breed2?.name || "", breed2?.imageUrl || "");

  const quizAnswers = useMemo<QuizAnswers | null>(() => {
    try {
      const stored = localStorage.getItem("dogmatch-quiz-answers");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const scores = useMemo(() => {
    if (!quizAnswers || !breed1 || !breed2) return null;
    const result = calculateMatch(quizAnswers);
    const score1 = result.scores.find(s => s.breed.name === breed1.name)?.score ?? 0;
    const score2 = result.scores.find(s => s.breed.name === breed2.name)?.score ?? 0;
    return { score1, score2 };
  }, [quizAnswers, breed1, breed2]);

  if (!breed1 || !breed2) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-3">Breeds not found</h2>
          <Link to="/breeds">
            <Button className="rounded-pill bg-primary text-primary-foreground mt-4">Browse Breeds</Button>
          </Link>
        </div>
      </div>
    );
  }

  const winner = scores ? (scores.score1 > scores.score2 ? breed1 : scores.score2 > scores.score1 ? breed2 : null) : null;
  const minWeightLbs1 = (breed1.minWeight * 2.205).toFixed(0);
  const maxWeightLbs1 = (breed1.maxWeight * 2.205).toFixed(0);
  const minWeightLbs2 = (breed2.minWeight * 2.205).toFixed(0);
  const maxWeightLbs2 = (breed2.maxWeight * 2.205).toFixed(0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="pt-20">
        <div className="border-b border-border bg-card/40 py-8">
          <div className="container mx-auto px-4">
            <Link to="/breeds" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Breeds
            </Link>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Head to head</p>
            <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground">
              {breed1.name} <span className="text-muted-foreground">vs</span> {breed2.name}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">

          {/* Smart recommendation banner */}
          {scores && winner && (
            <div className="card-soft rounded-2xl p-6 mb-8 border-2 border-accent/40 shadow-glow-accent text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-1">Based on your quiz results</p>
              <h2 className="font-heading font-black text-2xl text-foreground mb-2">
                {winner.name} is the better match for you
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your lifestyle, home, and vibe align more closely with a {winner.name}.
                Match score: <span className="text-foreground font-semibold">{winner.name === breed1.name ? scores.score1 : scores.score2}</span> vs <span className="text-foreground font-semibold">{winner.name === breed1.name ? scores.score2 : scores.score1}</span>.
              </p>
              <Link to={getBreedUrl(winner)} className="inline-block mt-4">
                <Button className="rounded-pill bg-accent text-accent-foreground font-heading font-semibold gap-2">
                  <Star className="w-4 h-4" /> Learn More About {winner.name}
                </Button>
              </Link>
            </div>
          )}

          {/* No quiz taken banner */}
          {!quizAnswers && (
            <div className="card-soft rounded-2xl p-5 mb-8 border border-primary/20 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-heading font-semibold text-foreground">Want a personalised recommendation?</p>
                <p className="text-muted-foreground text-sm">Take the quiz and we'll tell you which breed is the better match for your lifestyle.</p>
              </div>
              <Link to="/quiz">
                <Button className="rounded-pill bg-primary text-primary-foreground font-heading font-semibold gap-2 whitespace-nowrap">
                  <Star className="w-4 h-4" /> Take the Quiz
                </Button>
              </Link>
            </div>
          )}

          {/* Photos + names */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[{ breed: breed1, photo: photo1, score: scores?.score1 }, { breed: breed2, photo: photo2, score: scores?.score2 }].map(({ breed, photo, score }) => (
              <Link key={breed.name} to={getBreedUrl(breed)} className="group">
                <div className={`card-soft rounded-2xl overflow-hidden border-2 transition-all ${winner?.name === breed.name ? "border-accent shadow-glow-accent" : "border-border hover:border-primary/50"}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img src={photo} alt={breed.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    {winner?.name === breed.name && (
                      <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                        🏆 Better Match
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-foreground text-lg">{breed.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{breed.group}</p>
                    {score !== undefined && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min(score, 100)}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-accent">{score} pts</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[{ breed: breed1, minW: minWeightLbs1, maxW: maxWeightLbs1 }, { breed: breed2, minW: minWeightLbs2, maxW: maxWeightLbs2 }].map(({ breed, minW, maxW }) => (
              <div key={breed.name} className="card-soft rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium text-foreground">{breed.sizeCategory}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium text-foreground">{minW}–{maxW} lbs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lifespan</span>
                  <span className="font-medium text-foreground">{breed.minExpectancy}–{breed.maxExpectancy} yrs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Group</span>
                  <span className="font-medium text-foreground text-right text-xs">{breed.group.replace(" Group", "")}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stat comparison */}
          <div className="card-soft rounded-2xl p-6 mb-6">
            <h2 className="font-heading font-bold text-xl text-foreground mb-4 text-center">Trait Comparison</h2>
            <StatRow label="Energy" val1={breed1.energyLevelValue} val2={breed2.energyLevelValue} />
            <StatRow label="Trainability" val1={breed1.trainabilityValue} val2={breed2.trainabilityValue} />
            <StatRow label="Friendliness" val1={breed1.demeanorValue} val2={breed2.demeanorValue} />
            <StatRow label="Grooming" val1={breed1.groomingFrequencyValue} val2={breed2.groomingFrequencyValue} higherIsBetter={false} />
            <StatRow label="Shedding" val1={breed1.sheddingValue} val2={breed2.sheddingValue} higherIsBetter={false} />
          </div>

          {/* Boolean traits */}
          <div className="card-soft rounded-2xl p-6 mb-6">
            <h2 className="font-heading font-bold text-xl text-foreground mb-4 text-center">Lifestyle Fit</h2>
            <BoolRow label="Apartment OK" val1={breed1.isApartmentFriendly} val2={breed2.isApartmentFriendly} />
            <BoolRow label="Hypoallergenic" val1={breed1.isAllergyFriendly} val2={breed2.isAllergyFriendly} />
            <BoolRow label="Good w/ Kids" val1={breed1.isGoodWithKids} val2={breed2.isGoodWithKids} />
            <BoolRow label="Good w/ Pets" val1={breed1.isGoodWithPets} val2={breed2.isGoodWithPets} />
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/quiz">
              <Button className="rounded-pill bg-accent text-accent-foreground font-heading font-semibold gap-2 px-8">
                <Star className="w-4 h-4" /> {quizTaken ? "Retake the Quiz" : "Get My Personalised Match"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
