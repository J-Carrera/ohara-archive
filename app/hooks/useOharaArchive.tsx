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

  const askQuestion = (question: string) => {
    setIsWaiting(true);

    setAnswer("Waiting...");

    setTimeout(() => {
      setIsWaiting(false);

      if (sources.length === 0) {
        setAnswer(
          "No sources added yet. Add a URL above so I have something to answer from.",
        );
      } else {
        setAnswer(
          `This is a placeholder answer for: "${question}" (based on ${sources.length} source${
            sources.length > 1 ? "s" : ""
          }).`,
        );
      }
    }, 600);
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
