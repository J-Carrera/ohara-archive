"use client";

import type { Notebook } from "@/lib/types";

interface NotebookListProps {
  notebooks: Notebook[];
  activeNotebook: Notebook | null;
  onSelect: (notebook: Notebook) => void;
}

export default function NotebookList({
  notebooks,
  activeNotebook,
  onSelect,
}: NotebookListProps) {
  return (
    <div
      style={{
        width: 270,
        background: "#ffffff",
        borderRight: "1px solid #e5e5e5",
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 18,
          color: "#3f4d43",
          fontSize: 22,
        }}
      >
        Research Notebooks
      </h2>

      {notebooks.length === 0 && (
        <div
          style={{
            color: "#888",
            fontSize: 14,
          }}
        >
          No notebooks yet.
        </div>
      )}

      {notebooks.map((notebook) => {
        const active = activeNotebook?.id === notebook.id;

        return (
          <div
            key={notebook.id}
            onClick={() => onSelect(notebook)}
            style={{
              cursor: "pointer",
              padding: 14,
              marginBottom: 12,
              borderRadius: 12,
              transition: "0.15s",

              background: active ? "#3f4d43" : "#f7f7f7",

              color: active ? "white" : "#333",

              border: active ? "2px solid #3f4d43" : "1px solid #e5e5e5",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {notebook.title}
            </div>

            <div
              style={{
                fontSize: 13,
                opacity: 0.8,
                marginBottom: 10,
              }}
            >
              {notebook.description}
            </div>

            <div
              style={{
                fontSize: 11,
                opacity: 0.7,
              }}
            >
              Updated {new Date(notebook.updatedAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
