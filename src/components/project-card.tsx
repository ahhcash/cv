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
  bgImageUrl?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  bgImageUrl,
}: Props) {
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
      className={`border-mocha-overlay hover:border-mocha-lavender group relative flex overflow-hidden border p-4 transition-all duration-300 ${
        link ? "hover:cursor-pointer" : ""
      }`}
    >
      <CardWrapper>
        {/* Background Image with Overlay */}
        {bgImageUrl && (
          <>
            <div
              className="absolute inset-0 opacity-50 transition-all duration-300 group-hover:scale-105 group-hover:opacity-70"
              style={{
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform: "scale(1.02)",
              }}
            />
            <div className="from-mocha-surface/50 to-mocha-surface/70 group-hover:from-mocha-surface/40 group-hover:to-mocha-surface/60 absolute inset-0 bg-gradient-to-b transition-all duration-300" />
          </>
        )}

        {/* Content */}
        <div className="relative flex flex-1 flex-col">
          <CardHeader>
            <div className="space-y-1.5">
              <CardTitle className="text-mocha-text hover:bg-mocha-surface/20 rounded p-1 text-lg transition-all duration-300 hover:backdrop-blur-sm">
                {title}{" "}
                {link && (
                  <span className="bg-mocha-green ml-1.5 inline-block size-1.5 rounded-full"></span>
                )}
              </CardTitle>
              <div className="text-mocha-subtext hover:bg-mocha-surface/20 hidden rounded p-1 font-mono text-sm underline transition-all duration-300 hover:backdrop-blur-sm print:visible">
                {link
                  ?.replace("https://", "")
                  .replace("www.", "")
                  .replace("/", "")}
              </div>
              <CardDescription className="text-mocha-subtext hover:bg-mocha-surface/20 rounded p-1 font-mono text-sm transition-all duration-300 hover:backdrop-blur-sm">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  className="bg-mocha-surface/30 text-mocha-blue hover:bg-mocha-surface/40 pointer-events-none px-1.5 py-0.5 text-xs transition-all duration-300 hover:backdrop-blur-sm"
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
