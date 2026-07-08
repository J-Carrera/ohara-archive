"use client";

import { useState, KeyboardEvent } from "react";
import SourceList from "../components/archive/sourceList";
import UrlInput from "../components/archive/UrlInput";
import QuestionInput from "../components/archive/questionInput";
import AnswerCard from "../components/archive/answerCard";
import { useOharaArchive } from "./hooks/useOharaArchive";
import type { Source } from "../lib/types";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import Label from "../components/ui/label";
import TextInput from "../components/ui/textinput";

const colors = {
  sage: "#3f4d43",
  cream: "#f1efeb",
  card: "#ffffff",
  border: "#e3e0d9",
  text: "#2c2c2a",
  muted: "#8b8b85",
  beigeBtn: "#d9cfbd",
  beigeBtnHover: "#cdc0aa",
  teal: "#7fc9a8",
};

export default function OharaArchive() {
  const archive = useOharaArchive();

  return (
    <div
      style={{
        background: colors.cream,
        minHeight: "100vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        color: colors.text,
      }}
    >
      <div
        style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}
      >
        <header style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 0.5,
              margin: "0 0 4px",
              color: colors.sage,
            }}
          >
            OHARA ARCHIVE
          </h1>
          <p style={{ margin: 0, color: colors.muted, fontSize: 14 }}>
            Monday, July 6
          </p>
        </header>

        <Card>
          <UrlInput onSourceAdded={archive.handleSourceAdded} />
        </Card>

        <Card>
          <Label>Uploaded Source</Label>
          <SourceList
            sources={archive.sources}
            onRemove={archive.removeSource}
          />
        </Card>

        <Card>
          <QuestionInput onAsk={archive.askQuestion} />
        </Card>

        <Card>
          <AnswerCard answer={archive.answer} isWaiting={archive.isWaiting} />
        </Card>
      </div>
    </div>
  );
}
