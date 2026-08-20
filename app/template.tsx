import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-bounce w-full max-w-full">
      {children}
    </div>
  );
}
