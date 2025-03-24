"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/libs/utils";

interface TruncatedTextProps {
  text: string;
  className?: string;
  maxLength?: number;
  as?: React.ElementType;
  forceTruncate?: boolean;
}

export default function TruncatedText({
  text,
  className,
  maxLength,
  as: Component = "span",
  forceTruncate = false,
}: TruncatedTextProps) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        // Check if text is truncated due to overflow
        const isTrunc =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTruncated(
          isTrunc || (forceTruncate && text.length > (maxLength || 0))
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [text, forceTruncate, maxLength]);

  // Render the truncated text with conditional tooltip
  return (
    <div className="relative inline-block">
      <Component
        ref={textRef}
        className={cn("truncate", className)}
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => isTruncated && setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        {maxLength && forceTruncate && text.length > maxLength
          ? `${text.slice(0, maxLength)}...`
          : text}
      </Component>

      {showTooltip && isTruncated && (
        <div className="absolute z-[10000] left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 text-xs bg-gray-900 text-white rounded shadow-lg whitespace-nowrap">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
