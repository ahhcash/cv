"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";

interface Props {
  links: { url: string; title: string }[];
}

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    // Check if user is on macOS
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  React.useEffect(() => {
    // Keyboard shortcuts remain active regardless of menu visibility
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []); // Removed isVisible dependency since shortcuts should always work

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 20);
    };

    // Initial check when component mounts
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTerminalClick = () => {
    // The click handler remains active, but the button itself will be hidden
    const event = new KeyboardEvent("keydown", {
      key: "j",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      <div
        className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transform transition-all duration-300 print:hidden ${
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-4 opacity-0"
        }`}
        style={{ marginTop: "0.5rem" }}
        aria-hidden={!isVisible}
      >
        <div className="glow-effect flex items-center gap-8 rounded-lg border border-mocha-overlay bg-mocha-base/80 px-6 py-2 backdrop-blur-sm">
          {/* Search Command */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setOpen((open) => !open)}
                variant="ghost"
                className="h-auto p-0 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-pink/10 hover:text-mocha-pink"
              >
                search
              </Button>
              <span className="text-xs text-mocha-subtext/50">(</span>
              <kbd className="rounded bg-mocha-overlay/30 px-1.5 py-0.5 font-mono text-xs text-mocha-subtext">
                {isMac ? "⌘" : "Ctrl"}K
              </kbd>
              <span className="text-xs text-mocha-subtext/50">)</span>
            </div>
          </div>

          {/* Separator between shortcuts */}
          <div className="h-4 w-px bg-mocha-overlay" />

          {/* Terminal Command */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleTerminalClick}
                variant="ghost"
                className="h-auto p-0 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-pink/10 hover:text-mocha-pink"
              >
                cashbot
              </Button>
              <span className="text-xs text-mocha-subtext/50">(</span>
              <kbd className="rounded bg-mocha-overlay/30 px-1.5 py-0.5 font-mono text-xs text-mocha-subtext">
                {isMac ? "⌘" : "Ctrl"}J
              </kbd>
              <span className="text-xs text-mocha-subtext/50">)</span>
            </div>
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="border-b-mocha-overlay bg-mocha-base text-mocha-text placeholder:text-mocha-subtext"
        />
        <CommandList className="bg-mocha-base">
          <CommandEmpty className="px-2 py-2 text-base text-mocha-subtext">
            no results found.
          </CommandEmpty>
          <CommandGroup heading="Links" className="text-mocha-lavender">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false);
                  window.open(url, "_blank");
                }}
                className="text-mocha-text hover:bg-mocha-surface hover:text-mocha-blue"
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator className="bg-mocha-overlay" />
        </CommandList>
      </CommandDialog>
    </>
  );
};
