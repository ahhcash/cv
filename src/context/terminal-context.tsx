"use client";

import React, { createContext, useContext, useState } from "react";

type TerminalContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined,
);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TerminalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
