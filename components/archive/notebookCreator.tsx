"use client";

import { useState } from "react";

import Card from "../ui/card";
import Button from "../ui/button";
import Label from "../ui/label";
import TextInput from "../ui/textinput";

interface NotebookCreatorProps {
  onCreate: (title: string, description: string) => Promise<void>;
}

export default function NotebookCreator({ onCreate }: NotebookCreatorProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function create() {
    const trimmed = title.trim();

    if (!trimmed) return;

    await onCreate(trimmed, description.trim());

    setTitle("");
    setDescription("");
  }

  return (
    <Card>
      <Label>New Research Notebook</Label>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <TextInput
          value={title}
          onChange={setTitle}
          placeholder="Notebook title..."
          onEnter={create}
        />

        <TextInput
          value={description}
          onChange={setDescription}
          placeholder="Optional description..."
          onEnter={create}
        />

        <Button onClick={create}>Create Notebook</Button>
      </div>
    </Card>
  );
}
