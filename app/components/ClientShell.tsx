"use client";

import { ReactNode } from "react";
import CartDrawer from "./CartDrawer";
import AgeGate from "./AgeGate";
import MarketingScripts from "./MarketingScripts";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingScripts />
      {children}
      <CartDrawer />
      <AgeGate />
    </>
  );
}
