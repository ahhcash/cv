import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  bgImageUrl?: string; // We'll keep this in the props but not use it
}

export function ProjectCard({ title, description, tags, link }: Props) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1"
        >
          {children}
        </a>
      );
    }
    return <>{children}</>;
  };

  return (
    <Card
      className={`group relative flex overflow-hidden border border-mocha-overlay bg-mocha-surface/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-mocha-lavender ${
        link ? "hover:cursor-pointer hover:shadow-md" : ""
      }`}
    >
      <CardWrapper>
        <div className="relative flex flex-1 flex-col">
          <CardHeader>
            <div className="space-y-1.5">
              <CardTitle className="rounded p-1 text-lg text-mocha-text transition-all duration-300 group-hover:text-mocha-lavender">
                {title}{" "}
                {link && (
                  <span className="bg-mocha-green ml-1.5 inline-block size-1.5 rounded-full"></span>
                )}
              </CardTitle>
              <div className="hidden rounded p-1 font-mono text-sm text-mocha-subtext underline transition-all duration-300 print:visible">
                {link
                  ?.replace("https://", "")
                  .replace("www.", "")
                  .replace("/", "")}
              </div>
              <CardDescription className="rounded p-1 font-mono text-sm text-mocha-subtext transition-all duration-300 group-hover:text-mocha-text">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  className="pointer-events-none bg-mocha-surface/50 px-1.5 py-0.5 text-xs text-mocha-blue transition-all duration-300 hover:bg-mocha-surface/70"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </CardWrapper>
    </Card>
  );
}
