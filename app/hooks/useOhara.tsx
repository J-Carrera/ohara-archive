"use client";

import { useEffect, useState } from "react";

import type { Notebook, Source } from "@/lib/types";

export function useOhara() {
  // =====================================================
  // NOTEBOOK STATE
  // =====================================================

  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [activeNotebook, setActiveNotebook] = useState<Notebook | null>(null);

  // =====================================================
  // SOURCES
  // =====================================================

  const [sources, setSources] = useState<Source[]>([]);

  // =====================================================
  // AI
  // =====================================================

  const [answer, setAnswer] = useState("Waiting...");
  const [isWaiting, setIsWaiting] = useState(false);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadNotebooks();
  }, []);

  // Whenever the active notebook changes,
  // automatically load its sources.
  useEffect(() => {
    if (!activeNotebook) {
      setSources([]);
      return;
    }

    loadSources(activeNotebook.id);
  }, [activeNotebook]);

  // =====================================================
  // NOTEBOOK API
  // =====================================================

  async function loadNotebooks() {
    try {
      const response = await fetch("/api/notebooks");
      const data = await response.json();

      if (!data.success) return;

      setNotebooks(data.notebooks);

      if (data.notebooks.length > 0) {
        setActiveNotebook(data.notebooks[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createNotebook(title: string, description: string = "") {
    try {
      const response = await fetch("/api/notebooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();

      if (!data.success) return;

      await loadNotebooks();

      setActiveNotebook(data.notebook);
    } catch (error) {
      console.error(error);
    }
  }

  // =====================================================
  // SOURCES
  // =====================================================

  async function loadSources(notebookId: string) {
    try {
      const response = await fetch(`/api/notebooks/${notebookId}/sources`);

      const data = await response.json();

      if (!data.success) {
        setSources([]);
        return;
      }

      setSources(data.sources);
    } catch (error) {
      console.error(error);
      setSources([]);
    }
  }

  async function handleSourceAdded() {
    if (!activeNotebook) return;

    await loadSources(activeNotebook.id);
  }

  const removeSource = (index: number) => {
    setSources((prev) => prev.filter((_, i) => i !== index));
  };

  // =====================================================
  // AI QUESTIONS
  // =====================================================

  const askQuestion = async (question: string) => {
    if (!question.trim()) return;

    if (!activeNotebook) {
      setAnswer("Please select or create a notebook first.");
      return;
    }

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
          notebookId: activeNotebook.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setAnswer(data.error ?? "Unable to answer your question.");
        return;
      }

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong while contacting the AI.");
    } finally {
      setIsWaiting(false);
    }
  };

  // =====================================================
  // EXPORTED API
  // =====================================================

  return {
    // Notebook State
    notebooks,
    activeNotebook,
    setActiveNotebook,

    // Notebook Actions
    loadNotebooks,
    createNotebook,

    // Sources
    sources,
    loadSources,
    handleSourceAdded,
    removeSource,

    // AI
    answer,
    isWaiting,
    askQuestion,
  };
}
