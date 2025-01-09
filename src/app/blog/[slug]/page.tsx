import { notFound } from "next/navigation";
import { ParticlesBackground } from "@/components/particles-background";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllPosts, type BlogPost } from "@/lib/blog";
import { getMDXComponent } from "mdx-bundler/client";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<
  Array<BlogPostPageProps["params"]>
> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | ahhcash",
      description: "The requested blog post could not be found.",
    };
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} | ahhcash`,
    description: frontmatter.preview,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.preview,
      type: "article",
      publishedTime: frontmatter.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const Content = getMDXComponent(post.code);

  return (
    <div className="relative min-h-screen w-full">
      <ParticlesBackground />
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-4 pt-24 md:p-16 md:pt-28 print:p-12">
        <article className="prose-mocha prose prose-invert mx-auto max-w-4xl">
          <div className="mb-12">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-sm text-mocha-subtext no-underline transition-colors hover:text-mocha-text"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to blog
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="bg-gradient-to-r from-mocha-mauve to-mocha-blue bg-clip-text font-hack text-4xl font-bold text-transparent">
              {post.frontmatter.title}
            </h1>
            <time
              dateTime={post.frontmatter.date}
              className="mt-4 block font-mono text-sm text-mocha-subtext"
            >
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <div className="prose-code:bg-mocha-surface prose-pre:bg-mocha-surface prose-a:text-mocha-blue prose-a:no-underline prose-a:transition-colors hover:prose-a:text-mocha-lavender prose-strong:text-mocha-text prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-mocha-text">
            <Content />
          </div>
        </article>
      </main>
    </div>
  );
}
