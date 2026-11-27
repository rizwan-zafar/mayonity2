import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getSettings } from "@/lib/data";
import { extractFaqFromMarkdown, extractHeadings, renderMarkdown } from "@/lib/markdown";
import { documentTitle, stripTrailingBrand, siteUrl } from "@/lib/utils";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { shareImagesMeta } from "@/lib/seo-meta";
import { incrementBlogPostViews } from "@/lib/blog-views";
import { AttributionTracker } from "@/components/analytics/AttributionTracker";
import { BlogArticleAnalytics } from "@/components/analytics/BlogArticleAnalytics";
import { BlogArticleView } from "@/components/blog/BlogArticleView";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSettings()]);
  if (!post) return { title: "Article" };
  const siteName = settings.siteName?.trim() || "Mayonity";
  const headline = stripTrailingBrand(post.seoTitle || post.title, siteName);
  const images = shareImagesMeta(post.featuredImage);
  return {
    title: documentTitle(post.seoTitle || post.title, siteName),
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: headline,
      description: post.metaDescription,
      url: siteUrl(`/blog/${post.slug}`),
      ...images.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: headline,
      description: post.metaDescription,
      ...images.twitter,
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
  const faqs = extractFaqFromMarkdown(post.content);
  await incrementBlogPostViews(post.id).catch(() => {});

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
      {faqs.length ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
      <AttributionTracker path={`/blog/${post.slug}`} />
      <BlogArticleAnalytics />
      <BlogArticleView post={post} settings={settings} related={related} html={html} toc={toc} />
    </>
  );
}