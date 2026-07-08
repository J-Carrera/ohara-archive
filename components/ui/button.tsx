"use client";

import { ReactNode, useState } from "react";

const colors = {
  beigeBtn: "#d9cfbd",
  beigeBtnHover: "#cdc0aa",
};

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
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
