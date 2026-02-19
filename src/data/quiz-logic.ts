import { breeds, Breed } from "./breeds";

export interface QuizAnswers {
  homeType: "apartment" | "townhouse" | "house";
  homeSize: "studio" | "2br" | "3plus";
  activityLevel: "mostly-indoors" | "one-walk" | "two-plus";
  timeAtHome: "rarely" | "some" | "often" | "mostly";
  experience: "first-time" | "some" | "experienced";
  grooming: "minimal" | "moderate" | "frequent";
  shedding: "none" | "some" | "lots";
  allergies: "yes" | "no" | "unsure";
  noise: "quiet" | "moderate" | "doesnt-matter";
  vibe: "chill" | "balanced" | "adventure" | "protective";
}

export interface QuizResult {
  topMatch: Breed;
  runners: Breed[];
  scores: { breed: Breed; score: number }[];
}

export function calculateMatch(answers: QuizAnswers): QuizResult {
  const scored = breeds.map((breed) => {
    let score = 0;
    const maxScore = 100;

    // Home type + size → apartment-friendly
    if (answers.homeType === "apartment") {
      if (breed.isApartmentFriendly) score += 20;
      else score -= 10;
      // small dogs bonus
      const avgH = (breed.minHeight + breed.maxHeight) / 2;
      if (avgH < 40) score += 10;
    } else if (answers.homeType === "house") {
      score += 10; // most dogs fine
    }

    // Home size
    if (answers.homeSize === "studio") {
      if (breed.energyLevelValue <= 0.4) score += 10;
      const avgW = (breed.minWeight + breed.maxWeight) / 2;
      if (avgW < 10) score += 8;
    } else if (answers.homeSize === "3plus") {
      score += 5; // bonus for any large-dog-friendly home
    }

    // Activity level → energy
    const activityMap = {
      "mostly-indoors": 0.2,
      "one-walk": 0.5,
      "two-plus": 0.9,
    };
    const targetEnergy = activityMap[answers.activityLevel];
    const energyDiff = Math.abs(breed.energyLevelValue - targetEnergy);
    score += Math.round((1 - energyDiff) * 20);

    // Time at home
    if (answers.timeAtHome === "rarely" && breed.demeanorCategory !== "Aloof/Wary") {
      score += 5; // dogs that handle alone time better
    }
    if (answers.timeAtHome === "mostly") {
      if (breed.demeanorValue >= 0.8) score += 8;
    }

    // Experience
    if (answers.experience === "first-time") {
      if (breed.trainabilityValue >= 0.8) score += 15;
      if (breed.trainabilityValue <= 0.4) score -= 10;
    } else if (answers.experience === "experienced") {
      score += 5; // can handle anything
    }

    // Grooming
    const groomMap = { minimal: 0.2, moderate: 0.5, frequent: 0.8 };
    const targetGroom = groomMap[answers.grooming];
    const groomDiff = Math.abs(breed.groomingFrequencyValue - targetGroom);
    score += Math.round((1 - groomDiff) * 10);

    // Shedding
    const shedMap = { none: 0.1, some: 0.5, lots: 0.9 };
    const targetShed = shedMap[answers.shedding];
    const shedDiff = Math.abs(breed.sheddingValue - targetShed);
    score += Math.round((1 - shedDiff) * 10);

    // Allergies
    if (answers.allergies === "yes" && breed.isAllergyFriendly) score += 15;
    if (answers.allergies === "yes" && !breed.isAllergyFriendly) score -= 10;

    // Noise
    if (answers.noise === "quiet") {
      if (breed.demeanorCategory !== "Alert/Responsive") score += 5;
    }

    // Vibe
    if (answers.vibe === "chill") {
      if (breed.energyLevelValue <= 0.4) score += 15;
      else if (breed.energyLevelValue >= 0.8) score -= 10;
    } else if (answers.vibe === "adventure") {
      if (breed.energyLevelValue >= 0.8) score += 15;
      else if (breed.energyLevelValue <= 0.4) score -= 5;
    } else if (answers.vibe === "protective") {
      if (
        breed.demeanorCategory === "Alert/Responsive" ||
        breed.demeanorCategory === "Reserved with Strangers"
      )
        score += 15;
    } else {
      // balanced
      if (breed.energyLevelValue >= 0.5 && breed.energyLevelValue <= 0.8) score += 10;
    }

    return { breed, score: Math.max(0, score) };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    topMatch: scored[0].breed,
    runners: [scored[1].breed, scored[2].breed],
    scores: scored.slice(0, 10),
  };
}

export const quizQuestions = [
  {
    id: "homeType",
    question: "What type of home do you live in?",
    helper: "This helps us understand your living situation.",
    options: [
      { value: "apartment", label: "🏢 Apartment / Condo", desc: "No outdoor yard access" },
      { value: "townhouse", label: "🏘️ Townhouse", desc: "Small yard or patio" },
      { value: "house", label: "🏡 House", desc: "Yard access" },
    ],
  },
  {
    id: "homeSize",
    question: "How much indoor space do you have?",
    helper: "Think about square footage, not number of rooms.",
    options: [
      { value: "studio", label: "📦 Cozy (Studio / 1BR)", desc: "Under ~700 sqft" },
      { value: "2br", label: "🛋️ Mid-sized (2BR)", desc: "700–1200 sqft" },
      { value: "3plus", label: "🏠 Spacious (3BR+)", desc: "1200+ sqft" },
    ],
  },
  {
    id: "activityLevel",
    question: "What's your daily activity style?",
    helper: "No perfect answer — honesty leads to a better match.",
    options: [
      { value: "mostly-indoors", label: "🛋️ Mostly indoors", desc: "Short outdoor time" },
      { value: "one-walk", label: "🚶 One solid walk a day", desc: "30–45 min outside" },
      { value: "two-plus", label: "🏃 Active lifestyle", desc: "2+ hours outdoor activity" },
    ],
  },
  {
    id: "timeAtHome",
    question: "How much time are you home each day?",
    helper: "Some dogs need constant company; others are more independent.",
    options: [
      { value: "rarely", label: "🏢 Rarely (WFO full-time)", desc: "Less than 4 hrs home" },
      { value: "some", label: "🔄 Some days", desc: "Mixed schedule" },
      { value: "often", label: "🏠 Often (WFH some days)", desc: "Most of the day home" },
      { value: "mostly", label: "🌿 Mostly home", desc: "Always around" },
    ],
  },
  {
    id: "experience",
    question: "How much dog experience do you have?",
    helper: "Some breeds need more experienced handlers.",
    options: [
      { value: "first-time", label: "🐾 First-time owner", desc: "New to dogs" },
      { value: "some", label: "📚 Some experience", desc: "Had a dog before" },
      { value: "experienced", label: "🎯 Very experienced", desc: "Multiple dogs / training background" },
    ],
  },
  {
    id: "grooming",
    question: "How do you feel about grooming?",
    helper: "Some breeds need daily brushing; others just need a bath.",
    options: [
      { value: "minimal", label: "✂️ Keep it simple", desc: "Occasional bath & brush" },
      { value: "moderate", label: "🪮 Weekly upkeep", desc: "Brushing a few times a week" },
      { value: "frequent", label: "💅 I love it", desc: "Daily grooming, salon visits" },
    ],
  },
  {
    id: "shedding",
    question: "How do you feel about shedding?",
    helper: "Be honest — fur on the couch is real life.",
    options: [
      { value: "none", label: "🚫 Please, no fur!", desc: "Clean clothes matter" },
      { value: "some", label: "😐 I can handle some", desc: "Vacuum weekly" },
      { value: "lots", label: "🐕 Bring on the fluff!", desc: "I have a lint roller" },
    ],
  },
  {
    id: "allergies",
    question: "Does anyone in your household have dog allergies?",
    helper: "Some breeds are more allergy-friendly (lower dander).",
    options: [
      { value: "yes", label: "🤧 Yes", desc: "Need hypoallergenic breeds" },
      { value: "unsure", label: "🤔 Not sure", desc: "Play it safe" },
      { value: "no", label: "✅ No allergies", desc: "Open to all breeds" },
    ],
  },
  {
    id: "noise",
    question: "What's your noise situation?",
    helper: "Barky dogs can upset neighbors and landlords.",
    options: [
      { value: "quiet", label: "🤫 Very quiet household", desc: "Apartment walls are thin" },
      { value: "moderate", label: "🔉 Moderate noise is okay", desc: "Some barking is fine" },
      { value: "doesnt-matter", label: "📢 Noise doesn't matter", desc: "Open space or detached house" },
    ],
  },
  {
    id: "vibe",
    question: "What vibe do you want in a dog?",
    helper: "The personality chemistry matters most.",
    options: [
      { value: "chill", label: "😴 Chill couch buddy", desc: "Calm, low-energy companion" },
      { value: "balanced", label: "⚖️ Balanced & adaptable", desc: "Up for anything" },
      { value: "adventure", label: "🏔️ High-energy adventure dog", desc: "Runs, hikes, outdoors" },
      { value: "protective", label: "🛡️ Protective companion", desc: "Alert & loyal guardian" },
    ],
  },
];
