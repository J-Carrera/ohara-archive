"use client";

import { useState, KeyboardEvent } from "react";

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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        color: colors.sage,
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        padding: 24,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "12px 20px",
        border: "none",
        borderRadius: 8,
        background: hover ? colors.beigeBtnHover : colors.beigeBtn,
        color: "#4a4436",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  onEnter,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onEnter: () => void;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter();
  };
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      style={{
        flex: 1,
        padding: "12px 14px",
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        fontSize: 14,
        color: colors.text,
        background: colors.cream,
        outline: "none",
      }}
    />
  );
}

export default function OharaArchive() {
  const [urlInput, setUrlInput] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [questionInput, setQuestionInput] = useState("");
  const [answer, setAnswer] = useState("Waiting...");
  const [isWaiting, setIsWaiting] = useState(true);

  const addSource = () => {
    const val = urlInput.trim();
    if (!val) return;
    setSources((prev) => [...prev, val]);
    setUrlInput("");
  };

  const removeSource = (index: number) => {
    setSources((prev) => prev.filter((_, i) => i !== index));
  };

  const askQuestion = () => {
    const q = questionInput.trim();
    if (!q) return;
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
          `This is a placeholder answer for: "${q}" (based on ${sources.length} source${
            sources.length > 1 ? "s" : ""
          }).`,
        );
      }
    }, 600);
  };

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
          <Label>Paste URL</Label>
          <div style={{ display: "flex", gap: 10 }}>
            <TextInput
              value={urlInput}
              onChange={setUrlInput}
              placeholder="https://example.com/article"
              onEnter={addSource}
            />
            <Button onClick={addSource}>Add</Button>
          </div>
        </Card>

        <Card>
          <Label>Uploaded Sources</Label>
          {sources.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px 0",
                color: colors.muted,
                fontSize: 13,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#e3f3ea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.teal,
                    display: "block",
                  }}
                />
              </div>
              <div>No sources yet.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sources.map((url, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: colors.cream,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    wordBreak: "break-all",
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: colors.text,
                      textDecoration: "none",
                      marginRight: 10,
                    }}
                  >
                    {url}
                  </a>
                  <button
                    onClick={() => removeSource(i)}
                    style={{
                      background: "none",
                      border: "none",
                      color: colors.muted,
                      fontSize: 16,
                      padding: "0 4px",
                      lineHeight: 1,
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <Label>Ask Question</Label>
          <div style={{ display: "flex", gap: 10 }}>
            <TextInput
              value={questionInput}
              onChange={setQuestionInput}
              placeholder="What do you want to know?"
              onEnter={askQuestion}
            />
            <Button onClick={askQuestion}>Ask</Button>
          </div>
        </Card>

        <Card>
          <Label>Answer</Label>
          <div
            style={{
              minHeight: 60,
              padding: 14,
              background: colors.cream,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              fontSize: 14,
              color: isWaiting ? colors.muted : colors.text,
              fontStyle: isWaiting ? "italic" : "normal",
              lineHeight: 1.5,
            }}
          >
            {answer}
          </div>
        </Card>
      </div>
    </div>
  );
}
