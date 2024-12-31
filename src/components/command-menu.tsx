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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Moved to top and added terminal shortcut */}
      <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 transform print:hidden">
        <div className="border-mocha-overlay bg-mocha-base/80 flex items-center gap-4 rounded-lg border px-3 py-1.5 backdrop-blur-sm">
          {/* Search Command */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setOpen((open) => !open)}
              variant="ghost"
              className="text-mocha-subtext hover:text-mocha-blue h-auto p-0 font-mono text-sm transition-colors"
            >
              search
            </Button>
            <div className="bg-mocha-overlay h-4 w-px" />
            <kbd className="text-mocha-subtext hidden font-mono text-xs sm:inline-flex">
              <span className="px-1">⌘</span>K
            </kbd>
          </div>

          {/* Separator between shortcuts */}
          <div className="bg-mocha-overlay h-4 w-px" />

          {/* Terminal Command */}
          <div className="flex items-center gap-2">
            <span className="text-mocha-subtext font-mono text-sm">
              terminal
            </span>
            <div className="bg-mocha-overlay h-4 w-px" />
            <kbd className="text-mocha-subtext hidden font-mono text-xs sm:inline-flex">
              <span className="px-1">⌘</span>J
            </kbd>
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="border-b-mocha-overlay bg-mocha-base text-mocha-text placeholder:text-mocha-subtext"
        />
        <CommandList className="bg-mocha-base">
          <CommandEmpty className="text-mocha-subtext px-2 py-2 text-base">
            no results found.
          </CommandEmpty>
          <CommandGroup heading="Actions" className="text-mocha-lavender">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.location.href =
                  "https://drive.google.com/file/d/1TPIMfScRG3oUDAElL-8an3xhpxc3WHJa/view?usp=sharing";
              }}
              className="text-mocha-text hover:bg-mocha-surface hover:text-mocha-blue"
            >
              <span>Print</span>
            </CommandItem>
          </CommandGroup>
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
