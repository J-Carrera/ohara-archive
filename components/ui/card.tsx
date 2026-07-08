import { ReactNode } from "react";

const colors = {
  card: "#ffffff",
  border: "#e3e0d9",
};

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        padding: 24,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}
