import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

// Directory where blog posts are stored
const POSTS_PATH = path.join(process.cwd(), "content/blog");

// Type for blog post metadata
export interface BlogPostMeta {
  title: string;
  date: string;
  slug: string;
  preview: string;
  readingTime: string;
}

export interface BlogPost {
  frontmatter: BlogPostMeta;
  code: string;
}

// Get all blog posts metadata
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  // Read all files from the blog directory
  const files = fs.readdirSync(POSTS_PATH);

  // Get posts data
  const posts = await Promise.all(
    files
      .filter((file) => /\.mdx?$/.test(file))
      .map(async (file) => {
        const filePath = path.join(POSTS_PATH, file);
        const source = fs.readFileSync(filePath, "utf8");
        const { data } = matter(source);

        return {
          ...(data as BlogPostMeta),
          slug: file.replace(/\.mdx?$/, ""),
        };
      }),
  );

  // Sort posts by date
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Get a specific blog post by slug
export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeHighlight,
      ];
      return options;
    },
  });

  return {
    frontmatter: {
      ...frontmatter,
      slug,
    },
    code,
  };
}
