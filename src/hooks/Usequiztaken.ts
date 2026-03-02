import { useState, useEffect } from "react";

export function useQuizTaken() {
  const [quizTaken, setQuizTaken] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dogmatch-quiz-answers");
      setQuizTaken(!!stored);
    } catch {
      setQuizTaken(false);
    }
  }, []);

  return quizTaken;
}
