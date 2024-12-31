import { cn } from "@/lib/utils";
import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Section({
  className,
  children,
  title,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("flex min-h-0 flex-col gap-y-3", className)}
      {...props}
    >
      {title && (
        <div className="flex items-center gap-3">
          <h2 className="text-mocha-lavender font-hack text-xl font-bold">
            {title}
          </h2>
          <div className="from-mocha-overlay via-mocha-lavender/20 h-[1px] flex-grow bg-gradient-to-r to-transparent" />
        </div>
      )}
      {children}
    </section>
  );
}
