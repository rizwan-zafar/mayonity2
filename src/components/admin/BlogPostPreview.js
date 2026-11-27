"use client";

export function BlogPostPreview({ postId, className = "" }) {
  if (!postId) return null;

  const src = `/blog/preview/${postId}`;

  return (
    <section id="blog-post-preview" className={`grid min-h-0 gap-2 ${className}`} aria-labelledby="blog-preview-heading">
      <div className="flex items-center justify-between gap-2">
        <h2 id="blog-preview-heading" className="text-sm font-medium text-muted">
          Live preview
        </h2>
        <a href={src} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">
          Open in new tab
        </a>
      </div>
      <iframe
        title="Blog post preview as on the public site"
        src={src}
        className="h-[min(70vh,720px)] w-full rounded-2xl border border-white/10 bg-background lg:min-h-[640px]"
      />
    </section>
  );
}