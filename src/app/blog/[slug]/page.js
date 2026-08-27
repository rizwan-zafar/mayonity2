import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getSettings } from "@/lib/data";
import { extractHeadings, renderMarkdown } from "@/lib/markdown";
import { formatDate, siteUrl } from "@/lib/utils";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      url: siteUrl(`/blog/${post.slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const [related, settings] = await Promise.all([getRelatedPosts(post), getSettings()]);
  const html = renderMarkdown(post.content);
  const toc = extractHeadings(post.content);
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  const share = siteUrl(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={articleJsonLd(post, settings)} />
      <article className="px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">
            {post.category?.name} · {formatDate(post.publishedAt)} · {post.readingTime} min
          </p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)]">{post.title}</h1>
          <p className="mt-5 max-w-2xl body-copy">{post.excerpt}</p>
          <p className="mt-4 text-sm text-muted">By {post.author?.name}</p>
          <img src={post.featuredImage} alt={post.title} className="mt-10 w-full rounded-[1.8rem] border border-white/10 object-cover" />
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.5fr]">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {toc.length ? (
              <nav className="glass rounded-[1.3rem] p-5" aria-label="Table of contents">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contents</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  {toc.map((item) => (
                    <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>
                  ))}
                </ul>
              </nav>
            ) : null}
            <div className="glass rounded-[1.3rem] p-5 text-sm">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Share</p>
              <div className="mt-3 grid gap-2">
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(share)}`} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(share)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">X</a>
              </div>
            </div>
          </aside>
          <div
            className="prose-mayonity max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        {related.length ? (
          <div className="mx-auto mt-16 max-w-7xl">
            <h2 className="display text-4xl">Related articles</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-[1.3rem] border border-white/10 p-4">
                  <p className="text-xs text-cyan">{item.category?.name}</p>
                  <h3 className="display mt-2 text-2xl">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </>
  );
}
