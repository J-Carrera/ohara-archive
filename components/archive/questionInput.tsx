"use client";

import { useState } from "react";

import Card from "../ui/card";
import Button from "../ui/button";
import Label from "../ui/label";
import TextInput from "../ui/textinput";

interface QuestionInputProps {
  onAsk: (question: string) => void;
}

export default function QuestionInput({ onAsk }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const ask = () => {
    const trimmed = question.trim();

    if (!trimmed) return;

    onAsk(trimmed);

    setQuestion("");
  };

  return (
    <Card>
      <Label>Ask Question</Label>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <TextInput
          value={question}
          onChange={setQuestion}
          placeholder="What do you want to know?"
          onEnter={ask}
        />

        <Button onClick={ask}>Ask</Button>
      </div>
    </Card>
  );
}
