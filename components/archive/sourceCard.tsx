"use client";

import type { Source } from "@/lib/types";

const colors = {
  cream: "#f1efeb",
  border: "#e3e0d9",
  text: "#2c2c2a",
  muted: "#8b8b85",
  sage: "#3f4d43",
};

interface SourceCardProps {
  source: Source;
  onRemove: () => void;
}

export default function SourceCard({ source, onRemove }: SourceCardProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "14px",
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        background: colors.cream,
      }}
    >
      <div style={{ flex: 1 }}>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: colors.text,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {source.title || source.url}
        </a>

        <div
          style={{
            marginTop: 6,
            fontSize: 13,
            color: colors.muted,
            lineHeight: 1.4,
          }}
        >
          {source.preview}
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: colors.sage,
            fontWeight: 600,
          }}
        >
          {source.chunkCount} chunks • {source.wordCount.toLocaleString()} words
        </div>
      </div>

      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          fontSize: 18,
          color: colors.muted,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
