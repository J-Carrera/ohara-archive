"use client";

import { useState } from "react";

import Card from "../ui/card";
import Button from "../ui/button";
import Label from "../ui/label";
import TextInput from "../ui/textinput";

import type { Source } from "@/lib/types";

interface UrlInputProps {
  onSourceAdded: (source: Source) => void;
}

export default function UrlInput({ onSourceAdded }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const addSource = async () => {
    const trimmed = url.trim();

    if (!trimmed) return;

    try {
      const response = await fetch("/api/process-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to process article.");
      }

      const source: Source = await response.json();

      onSourceAdded(source);

      setUrl("");
    } catch (err) {
      console.error(err);
      alert("Unable to process website.");
    }
  };

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
