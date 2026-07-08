import { ReactNode } from "react";

const colors = {
  sage: "#3f4d43",
};

interface LabelProps {
  children: ReactNode;
}

export default function Label({ children }: LabelProps) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        color: colors.sage,
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}
