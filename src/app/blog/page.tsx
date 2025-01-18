import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ParticlesBackground } from "@/components/particles-background";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import TypedText from "@/components/typed-text";

export const metadata: Metadata = {
  title: "Blog | ahhcash",
  description: "trying to yap my way through life",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="relative min-h-screen w-full">
      <ParticlesBackground />
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto px-4 pt-24 md:p-16 md:pt-28 print:p-12">
        <section className="mx-auto w-full max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-mocha-mauve via-mocha-pink to-mocha-blue bg-clip-text font-hack text-4xl font-bold text-transparent">
              <TypedText text="ahhcash's blog" />
            </h1>
            <p className="font-mono text-base text-mocha-text">
              trying to yap my way through life
            </p>
          </div>

          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <Card className="group border-mocha-overlay bg-mocha-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-mocha-lavender hover:bg-mocha-surface hover:shadow-[0_0_15px_rgba(203,166,247,0.15)]">
                  <CardHeader className="space-y-4 px-8 pt-8">
                    <div className="space-y-2">
                      <h2 className="bg-gradient-to-r from-mocha-lavender via-mocha-mauve to-mocha-blue bg-clip-text font-hack text-xl font-semibold text-transparent transition-all duration-300 group-hover:from-mocha-pink group-hover:via-mocha-mauve group-hover:to-mocha-lavender">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-4 font-mono text-sm text-mocha-subtext">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="font-mono text-sm leading-relaxed text-mocha-subtext transition-all duration-300 group-hover:text-mocha-text">
                      {post.preview}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
