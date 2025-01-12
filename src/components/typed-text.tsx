"use client";
import React, { useState, useEffect } from "react";

const TypedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Effect for typing animation
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50); // Typing speed: 50ms per character

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      {/* Adding a more pronounced cursor with gradient colors */}
      <span
        className={`inline-block h-[1em] w-[3px] translate-y-[0.1em] bg-gradient-to-b from-mocha-mauve via-mocha-pink to-mocha-blue ${
          isTypingComplete ? "animate-cursor-blink" : "opacity-100"
        }`}
        aria-hidden="true"
      />
    </span>
  );
};

export default TypedText;
