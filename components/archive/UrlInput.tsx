"use client";

import { useState } from "react";

import Card from "../ui/card";
import Button from "../ui/button";
import Label from "../ui/label";
import TextInput from "../ui/textinput";

import type { Notebook } from "@/lib/types";

interface UrlInputProps {
  activeNotebook: Notebook;
  onSourceAdded: () => Promise<void>;
}

export default function UrlInput({
  activeNotebook,
  onSourceAdded,
}: UrlInputProps) {
  const [url, setUrl] = useState("");

  async function addSource() {
    const trimmed = url.trim();

    if (!trimmed) return;

    try {
      const response = await fetch("/api/process-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notebookId: activeNotebook.id,
          url: trimmed,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to process article.");
      }

      await onSourceAdded();

      setUrl("");
    } catch (error) {
      console.error(error);

      alert("Unable to process website.");
    }
  }

  return (
    <Card>
      <Label>Paste URL</Label>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <TextInput
          value={url}
          onChange={setUrl}
          placeholder="https://example.com/article"
          onEnter={addSource}
        />

        <Button onClick={addSource}>Add</Button>
      </div>
    </Card>
  );
}
