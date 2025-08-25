
import React from "react";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="customer-layout">
      <h1>Customer Layout</h1>
      <div>{children}</div>
    </div>
  );
}
