"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Terminal as TerminalIcon, ExternalLink } from "lucide-react";

const convertLinksToElements = (text: string) => {
  // Enhanced regex to match more URL patterns
  const urlRegex =
    /(?:(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?:\/[^\s,)]*)?|(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|edu|gov|mil|biz|info|io|ai|dev|xyz|me|tv)(?:\/[^\s,)]*)?)([,)\s])?/g;

  let lastIndex = 0;
  const elements: (string | JSX.Element)[] = [];
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add the text before the match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    // Extract the URL without trailing punctuation
    const url = match[1]
      ? text.slice(
          match.index,
          match.index + match[0].length - (match[2] || "").length,
        )
      : match[0];
    const punctuation = match[2] || "";

    // Ensure the URL has a protocol
    const fullUrl = url.startsWith("http")
      ? url
      : `https://${url.startsWith("www.") ? url.slice(4) : url}`;

    elements.push(
      <a
        key={match.index}
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5
        text-blue-400 decoration-blue-300/30 transition-all
        duration-200 hover:bg-blue-400/10 hover:text-blue-300 hover:underline"
      >
        {url}
        <ExternalLink className="h-3 w-3" />
      </a>,
    );

    // Add back any trailing punctuation as plain text
    if (punctuation) {
      elements.push(punctuation);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text after the last match
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
      if ((event.ctrlKey || event.metaKey) && event.key === ";") {
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

  // Simulate LLM response (replace with actual API call in a real application)
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
                // Update the last history entry in real-time
                setHistory((prev) => {
                  const newHistory = [...prev];
                  const lastIndex = newHistory.length - 1;
                  newHistory[lastIndex].response = responseText;
                  return newHistory;
                });
              } else if (parsed.type === "finalMessage") {
                // Do nothing for finalMessage, as we've already processed the content
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
      // Update the last history entry with an error message
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
          className="fixed bottom-4 right-4 bg-gray-800 text-gray-200 hover:bg-gray-700"
        >
          <TerminalIcon className="h-4 w-4" />
          <span className="sr-only">Open terminal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-gray-700 bg-gray-900 sm:max-w-[1000px]">
        <div className="w-full rounded-lg bg-gray-900 p-4 font-mono text-gray-300 shadow-lg">
          <div
            ref={terminalRef}
            className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 mb-4 h-96 overflow-y-auto"
          >
            {history.map((item, index) => (
              <div key={index}>
                <div className="flex">
                  <span className="mr-2 text-yellow-500">$</span>
                  <span>{item.command}</span>
                </div>
                <div className="mb-2 ml-4 text-gray-400">
                  {convertLinksToElements(item.response)}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <span className="mr-2 text-yellow-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent text-gray-300 placeholder-gray-500 outline-none"
              placeholder="what do you want to know?"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
