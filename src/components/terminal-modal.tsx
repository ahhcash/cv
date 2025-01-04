"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Terminal as TerminalIcon, ExternalLink } from "lucide-react";

const convertLinksToElements = (text: string) => {
  // Combined regex for URLs and email addresses
  const combinedRegex =
    /(?:(?:(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?:\/[^\s,)]*)?|(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|edu|gov|mil|biz|info|io|ai|dev|xyz|me|tv)(?:\/[^\s,)]*)?)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))([,)\s])?/g;

  let lastIndex = 0;
  const elements: (string | JSX.Element)[] = [];
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const isEmail = match[2]; // Email match group
    const content = isEmail
      ? match[2]
      : match[1]
        ? text.slice(
            match.index,
            match.index + match[0].length - (match[3] || "").length,
          )
        : match[0];
    const punctuation = match[3] || "";

    if (isEmail) {
      elements.push(
        <a
          key={match.index}
          href={`mailto:${content}`}
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5
          text-mocha-blue decoration-mocha-blue/30 transition-all
          duration-200 hover:bg-mocha-blue/10 hover:text-mocha-blue hover:underline"
        >
          {content}
          <ExternalLink className="h-3 w-3" />
        </a>,
      );
    } else {
      const fullUrl = content.startsWith("http")
        ? content
        : `https://${content.startsWith("www.") ? content.slice(4) : content}`;

      elements.push(
        <a
          key={match.index}
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5
          text-mocha-blue decoration-mocha-blue/30 transition-all
          duration-200 hover:bg-mocha-blue/10 hover:text-mocha-blue hover:underline"
        >
          {content}
          <ExternalLink className="h-3 w-3" />
        </a>,
      );
    }

    if (punctuation) {
      elements.push(punctuation);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

export const TerminalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<
    Array<{ command: string; response: string }>
  >([]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "j") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setHistory((prev) => [...prev, { command: input, response: "..." }]);
    await simulateLLMResponse(input, history);
    setInput("");
  };

  const simulateLLMResponse = async (
    command: string,
    history: Array<{ command: string; response: string }>,
  ) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command, history }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let responseText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk
            .split("\n")
            .filter((line) => line.startsWith("data: "));
          for (const line of lines) {
            const data = line.replace(/^data: /, "").trim();
            if (data === "[DONE]") return;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "message") {
                let messageContent = "";
                if (
                  parsed.message &&
                  parsed.message.content &&
                  parsed.message.content[0] &&
                  parsed.message.content[0].text
                ) {
                  messageContent = parsed.message.content[0].text;
                }
                responseText += messageContent;
                setHistory((prev) => {
                  const newHistory = [...prev];
                  const lastIndex = newHistory.length - 1;
                  newHistory[lastIndex].response = responseText;
                  return newHistory;
                });
              }
            } catch (err) {
              console.error("Error parsing stream data:", err);
            }
          }
        }
      }

      return responseText;
    } catch (error) {
      console.error("Error streaming LLM response:", error);
      setHistory((prev) => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        newHistory[lastIndex].response =
          "Sorry, I encountered an error while processing your request.";
        return newHistory;
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 border-mocha-overlay bg-mocha-base text-mocha-text transition-colors duration-200 hover:bg-mocha-surface hover:text-mocha-pink"
        >
          <TerminalIcon className="h-4 w-4" />
          <span className="sr-only">Open terminal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-mocha-overlay bg-mocha-base sm:max-w-[1000px]">
        <div className="w-full rounded-lg bg-mocha-base p-4 text-mocha-text shadow-lg">
          <div
            ref={terminalRef}
            className="scrollbar-thin scrollbar-thumb-mocha-overlay scrollbar-track-mocha-surface mb-4 h-96 overflow-y-auto"
          >
            {history.map((item, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-mocha-pink">$</span>
                  <span className="text-mocha-text">{item.command}</span>
                </div>
                <div className="ml-4 font-hack text-mocha-subtext">
                  {convertLinksToElements(item.response)}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="font-mono text-mocha-pink">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded bg-transparent px-2 py-1 font-mono text-mocha-text placeholder-mocha-subtext/50 outline-none transition-all duration-200 focus:bg-mocha-surface/30"
              placeholder="what do you want to know?"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
