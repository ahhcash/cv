"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { RESUME_DATA } from "@/data/resume-data";
import { Menu, X } from "lucide-react";
import { useTerminal } from "@/context/terminal-context";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMac, setIsMac] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsOpen: setTerminalOpen } = useTerminal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleTerminalClick = () => {
    setTerminalOpen(true);
  };

  const mainNavItems = [
    {
      label: "home",
      href: "/",
    },
    {
      label: "blog",
      href: "/blog",
    },
    {
      label: "stats",
      href: "/#stats",
    },
    {
      label: "contact",
      href: "https://cal.com/ahhcash/30min",
    },
    {
      label: (
        <span className="group relative flex items-center gap-2">
          cashbot
          {/* Continuous pulsating gradient background */}
          <span className="absolute -inset-x-4 -inset-y-2 -z-10 animate-pulse rounded-lg bg-gradient-to-r from-mocha-mauve/20 via-mocha-pink/20 to-mocha-blue/20 blur-md"></span>
          {/* Glowing border that's always visible but intensifies on hover */}
          <span className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-lg border border-transparent bg-gradient-to-r from-mocha-mauve via-mocha-pink to-mocha-blue bg-clip-border opacity-20 transition-opacity duration-500 group-hover:opacity-40"></span>
          <kbd className="hidden rounded bg-mocha-overlay/30 px-1.5 py-0.5 font-mono text-xs text-mocha-subtext sm:inline-block">
            {isMac ? "⌘" : "Ctrl"}J
          </kbd>
        </span>
      ),
      href: "#",
      onClick: handleTerminalClick,
    },
  ];

  const handleNavigation = useCallback(
    (href: string) => {
      if (href.startsWith("http")) {
        window.location.href = href;
      } else if (href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        router.push(href);
      } else {
        router.push(href);
      }
    },
    [router],
  );

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b border-mocha-overlay backdrop-blur-sm transition-all duration-200",
          scrolled ? "bg-mocha-base/80 shadow-lg" : "bg-mocha-base/60",
        )}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-mocha-subtext transition-colors hover:bg-mocha-surface/80 hover:text-mocha-text md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-6 md:flex">
            {mainNavItems.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="rounded px-3 py-2 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-surface/80 hover:text-mocha-text"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded px-3 py-2 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-surface/80 hover:text-mocha-text",
                      pathname === item.href && "text-mocha-text",
                    )}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(true)}
            className="hidden rounded px-3 py-2 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-surface/80 hover:text-mocha-text md:block"
          >
            <kbd className="rounded bg-mocha-overlay/30 px-1.5 py-0.5 font-mono text-xs">
              {isMac ? "⌘" : "Ctrl"}K
            </kbd>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "absolute left-0 right-0 top-full border-b border-mocha-overlay bg-mocha-base/95 backdrop-blur-sm transition-all duration-200 md:hidden",
            mobileMenuOpen ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col space-y-2 p-4">
            {mainNavItems.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded px-3 py-2 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-surface/80 hover:text-mocha-text"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block w-full rounded px-3 py-2 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-surface/80 hover:text-mocha-text",
                      pathname === item.href && "text-mocha-text",
                    )}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded px-3 py-2 font-mono text-sm text-mocha-subtext transition-all duration-200 hover:bg-mocha-surface/80 hover:text-mocha-text"
              >
                <span>Search</span>
                <kbd className="rounded bg-mocha-overlay/30 px-1.5 py-0.5 font-mono text-xs">
                  {isMac ? "⌘" : "Ctrl"}K
                </kbd>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="border-b-mocha-overlay bg-mocha-base text-mocha-text placeholder:text-mocha-subtext"
        />
        <CommandList className="bg-mocha-base">
          <CommandEmpty className="px-2 py-2 text-base text-mocha-subtext">
            no results found.
          </CommandEmpty>
          <CommandGroup heading="Navigation" className="text-mocha-lavender">
            {mainNavItems
              .filter((item) => !item.onClick)
              .map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleNavigation(item.href)}
                  className="text-mocha-text hover:bg-mocha-surface hover:text-mocha-blue"
                >
                  <span>
                    {typeof item.label === "string" ? item.label : "navigation"}
                  </span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator className="bg-mocha-overlay" />
          <CommandGroup heading="Social" className="text-mocha-lavender">
            {RESUME_DATA.contact.social.map((social) => (
              <CommandItem
                key={social.name}
                onSelect={() => handleNavigation(social.url)}
                className="text-mocha-text hover:bg-mocha-surface hover:text-mocha-blue"
              >
                <span>{social.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
