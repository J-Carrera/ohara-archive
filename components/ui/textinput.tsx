"use client";

import { KeyboardEvent } from "react";

const colors = {
  cream: "#f1efeb",
  border: "#e3e0d9",
  text: "#2c2c2a",
};

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;

  // Optional callback when Enter is pressed
  onEnter?: () => void;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  onEnter,
}: TextInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter?.();
    }
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
