"use client";

import SourceList from "../components/archive/sourceList";
import UrlInput from "../components/archive/UrlInput";
import QuestionInput from "../components/archive/questionInput";
import AnswerCard from "../components/archive/answerCard";
import NotebookList from "../components/archive/notebookList";
import NotebookCreator from "../components/archive/notebookCreator";

import { useOhara } from "./hooks/useOhara";

import Card from "../components/ui/card";
import Label from "../components/ui/label";

const colors = {
  sage: "#3f4d43",
  cream: "#f1efeb",
  card: "#ffffff",
  border: "#e3e0d9",
  text: "#2c2c2a",
  muted: "#8b8b85",
};

export default function OharaArchive() {
  const {
    notebooks,
    activeNotebook,
    setActiveNotebook,

    createNotebook,

    sources,

    answer,
    isWaiting,

    handleSourceAdded,
    removeSource,
    askQuestion,
  } = useOhara();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: colors.cream,
        color: colors.text,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* =========================
          Sidebar
      ========================= */}
      <div
        style={{
          width: 320,
          background: "#ffffff",
          borderRight: "1px solid #e5e5e5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 20,
            borderBottom: "1px solid #ececec",
          }}
        >
          <NotebookCreator onCreate={createNotebook} />
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          <NotebookList
            notebooks={notebooks}
            activeNotebook={activeNotebook}
            onSelect={setActiveNotebook}
          />
        </div>
      </div>

      {/* =========================
          Main Content
      ========================= */}
      <main
        style={{
          flex: 1,
          padding: "48px",
        }}
      >
        <div
          style={{
            maxWidth: 850,
            margin: "0 auto",
          }}
        >
          <header
            style={{
              marginBottom: 32,
            }}
          >
            <h1
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: colors.sage,
                marginBottom: 8,
              }}
            >
              OHARA ARCHIVE
            </h1>

            <p
              style={{
                color: colors.muted,
                margin: 0,
              }}
            >
              {activeNotebook
                ? `Notebook: ${activeNotebook.title}`
                : "Select or create a notebook to begin researching."}
            </p>
          </header>

          {/* Upload URLs */}
          {activeNotebook && (
            <>
              <Card>
                <UrlInput
                  activeNotebook={activeNotebook}
                  onSourceAdded={handleSourceAdded}
                />
              </Card>

              <div style={{ height: 20 }} />
            </>
          )}

          {/* Uploaded Sources */}
          {activeNotebook && (
            <>
              <Card>
                <Label>Uploaded Sources</Label>

                <SourceList sources={sources} onRemove={removeSource} />
              </Card>

              <div style={{ height: 20 }} />
            </>
          )}

          {/* Ask Questions */}
          {activeNotebook && (
            <>
              <Card>
                <QuestionInput onAsk={askQuestion} />
              </Card>

              <div style={{ height: 20 }} />

              <Card>
                <AnswerCard answer={answer} isWaiting={isWaiting} />
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
