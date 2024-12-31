import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
  return (
    <Card className="border-mocha-overlay hover:border-mocha-lavender bg-mocha-surface flex flex-col overflow-hidden border p-3 transition-colors">
      <CardHeader className="">
        <div className="space-y-1">
          <CardTitle className="text-mocha-text text-base">
            {link ? (
              <a
                href={link}
                target="_blank"
                className="hover:text-mocha-blue inline-flex items-center gap-1 transition-colors"
              >
                {title}{" "}
                <span className="bg-mocha-green size-1 rounded-full"></span>
              </a>
            ) : (
              title
            )}
          </CardTitle>
          <div className="text-mocha-subtext hidden font-mono text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <CardDescription className="text-mocha-subtext font-mono text-xs">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="bg-mocha-overlay text-mocha-blue hover:bg-mocha-surface px-1 py-0 text-[10px] transition-colors"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
