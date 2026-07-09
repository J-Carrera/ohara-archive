"use client";

import { useState } from "react";
import type { Source } from "@/lib/types";

export function useOharaArchive() {
  const [sources, setSources] = useState<Source[]>([]);
  const [answer, setAnswer] = useState("Waiting...");
  const [isWaiting, setIsWaiting] = useState(true);

  const handleSourceAdded = (source: Source) => {
    setSources((prev) => [...prev, source]);
  };

  const removeSource = (index: number) => {
    setSources((prev) => prev.filter((_, i) => i !== index));
  };

  const askQuestion = async (question: string) => {
    if (!question.trim()) return;

    setIsWaiting(true);
    setAnswer("Thinking...");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setAnswer(data.error ?? "Unable to answer your question.");
        return;
      }

      setAnswer(data.answer);
    } catch (error) {
      console.error("ASK ERROR:", error);
      setAnswer("Something went wrong while contacting the AI.");
    } finally {
      setIsWaiting(false);
    }
  };

  return {
    sources,
    answer,
    isWaiting,

    handleSourceAdded,
    removeSource,
    askQuestion,
  };
}
