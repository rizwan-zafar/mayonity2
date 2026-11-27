import Link from "next/link";
import { formatDate, readingTimeFrom, siteUrl } from "@/lib/utils";
import { COST_GUIDE_SLUGS_WITH_QUOTE_PROMO, QuoteReviewPromo } from "@/components/marketing/QuoteReviewPromo";

/**
 * @param {{
 *   post: object;
 *   settings: object;
 *   related: object[];
 *   html: string;
 *   toc: { id: string; text: string }[];
 *   isPreview?: boolean;
 * }} props
 */
export function BlogArticleView({ post, settings, related, html, toc, isPreview = false }) {
  const siteName = settings.siteName?.trim() || "Mayonity";
  const minutes = readingTimeFrom(post.content);
  const share = siteUrl(`/blog/${post.slug}`);
  const slug = post.slug;

  return (
    <article className="px-5 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        {isPreview && !post.published ? (
          <p
            className="mb-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-sm text-amber-100"
            role="status"
          >
            Draft preview — not visible on the public site until published.
          </p>
        ) : null}
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">
          {post.category?.name} · {formatDate(post.publishedAt)} · {minutes} min
        </p>
        <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)]">{post.title}</h1>
        <p className="mt-5 max-w-2xl body-copy">{post.excerpt}</p>
        {post.teamMember ? (
          <Link
            href="/team"
            className="mt-6 flex max-w-md items-center gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
          >
            <img
              src={post.teamMember.photo}
              alt={post.teamMember.name}
              className="h-14 w-14 shrink-0 rounded-full border border-white/10 object-cover"
            />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Written by</p>
              <p className="display mt-1 text-xl text-[var(--text)]">{post.teamMember.name}</p>
              <p className="mt-0.5 text-sm text-cyan">{post.teamMember.position}</p>
            </div>
          </Link>
        ) : (
          <p className="mt-4 text-sm text-muted">By {siteName}</p>
        )}
        <img
          src={post.featuredImage}
          alt={post.title}
          className="mt-10 w-full rounded-[1.8rem] border border-white/10 object-cover"
        />
      </div>
      <div className="mx-auto mt-12 grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.5fr]">
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {toc.length ? (
            <nav className="glass rounded-[1.3rem] p-5" aria-label="Table of contents">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contents</p>
              <ul className="mt-4 grid gap-2 text-sm text-muted">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <div className="glass rounded-[1.3rem] p-5 text-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Share</p>
            <div className="mt-3 grid gap-2">
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(share)}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(share)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
            </div>
          </div>
        </aside>
        <div data-blog-article className="prose-mayonity max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        {COST_GUIDE_SLUGS_WITH_QUOTE_PROMO.includes(slug) ? <QuoteReviewPromo className="mt-8" /> : null}
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
  );
}