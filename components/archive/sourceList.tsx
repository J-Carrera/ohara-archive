"use client";

import type { Source } from "@/lib/types";
import SourceCard from "./sourceCard";

const colors = {
  muted: "#8b8b85",
  teal: "#7fc9a8",
};

interface SourceListProps {
  sources: Source[];
  onRemove: (index: number) => void;
}

export default function SourceList({ sources, onRemove }: SourceListProps) {
  if (sources.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "24px 0",
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
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 12px",
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
        No sources yet.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {sources.map((source, index) => (
        <SourceCard
          key={source.id}
          source={source}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
}
