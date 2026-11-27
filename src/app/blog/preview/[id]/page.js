import { notFound, redirect } from "next/navigation";
import { getPostByIdForPreview, getRelatedPosts, getSettings } from "@/lib/data";
import { extractHeadings, renderMarkdown } from "@/lib/markdown";
import { requireAdmin } from "@/lib/auth";
import { BlogArticleView } from "@/components/blog/BlogArticleView";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Blog preview",
};

export default async function BlogPreviewPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");

  const { id } = await params;
  const post = await getPostByIdForPreview(id);
  if (!post) notFound();

  const [related, settings] = await Promise.all([
    getRelatedPosts(post),
    getSettings(),
  ]);
  const html = renderMarkdown(post.content);
  const toc = extractHeadings(post.content);

  return (
    <BlogArticleView
      post={post}
      settings={settings}
      related={related}
      html={html}
      toc={toc}
      isPreview
    />
  );
}