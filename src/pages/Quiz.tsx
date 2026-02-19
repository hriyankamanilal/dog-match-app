import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizQuestions, QuizAnswers } from "@/data/quiz-logic";
import Navbar from "@/components/Navbar";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const navigate = useNavigate();

  const q = quizQuestions[step];
  const selected = answers[q.id as keyof QuizAnswers];
  const progress = ((step + 1) / quizQuestions.length) * 100;

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  }

  function handleNext() {
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      const params = new URLSearchParams();
      Object.entries(answers).forEach(([k, v]) => params.set(k, v as string));
      navigate(`/results?${params.toString()}`);
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-10 flex-1 flex flex-col max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {step + 1} of {quizQuestions.length}</span>
              <span className="text-accent font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="flex-1">
            <p className="text-muted-foreground text-sm mb-2 italic">{q.helper}</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selected === opt.value
                      ? "border-accent bg-accent/10 shadow-glow-accent"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="font-heading font-semibold text-foreground text-base">{opt.label}</div>
                  <div className="text-muted-foreground text-sm mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
              className="rounded-pill gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selected}
              className="rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold gap-2 px-8 shadow-glow-accent"
            >
              {step < quizQuestions.length - 1 ? "Next" : "See My Match"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
