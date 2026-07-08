"use client";

import Card from "../ui/card";
import Label from "../ui/label";

const colors = {
  cream: "#f1efeb",
  border: "#e3e0d9",
  text: "#2c2c2a",
  muted: "#8b8b85",
};

interface AnswerCardProps {
  answer: string;
  isWaiting: boolean;
}

export default function AnswerCard({ answer, isWaiting }: AnswerCardProps) {
  return (
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
  );
}
