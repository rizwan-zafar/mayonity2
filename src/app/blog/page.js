import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { getPublishedPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Journal",
  description: "Mayonity writing on technology, product, design, mobile, commerce and digital transformation.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";
  const tag = typeof params.tag === "string" ? params.tag : "";
  const { posts, categories, tags, featured, popular } = await getPublishedPosts({ q, category, tag });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageHero eyebrow="Journal" title="Notes from the studio." copy="Technology, product, design and the business of building what comes next." />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-[1.4fr_0.7fr] md:px-8">
        <div>
          {featured && !q && !category && !tag ? (
            <Link href={`/blog/${featured.slug}`} className="mb-8 block overflow-hidden rounded-[1.7rem] border border-white/10">
              <img src={featured.featuredImage} alt={featured.title} className="aspect-[16/8] w-full object-cover" />
              <div className="p-6">
                <p className="font-mono text-xs text-cyan">Featured · {featured.category?.name}</p>
                <h2 className="display mt-2 text-4xl">{featured.title}</h2>
                <p className="mt-3 text-muted">{featured.excerpt}</p>
              </div>
            </Link>
          ) : null}
          <div className="grid gap-5">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="grid gap-4 rounded-[1.4rem] border border-white/10 p-4 md:grid-cols-[220px_1fr]">
                <img src={post.featuredImage} alt="" className="aspect-video w-full rounded-xl object-cover" />
                <div>
                  <p className="font-mono text-xs text-cyan">{post.category?.name} · {formatDate(post.publishedAt)}</p>
                  <h2 className="display mt-2 text-3xl">{post.title}</h2>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <form className="glass rounded-[1.4rem] p-5">
            <label htmlFor="q" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Search</label>
            <input id="q" name="q" defaultValue={q} className="mt-3 w-full rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm" placeholder="Search articles" />
          </form>
          <div className="glass rounded-[1.4rem] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Categories</p>
            <div className="mt-4 grid gap-2 text-sm">
              {categories.map((item) => (
                <Link key={item.slug} href={`/blog?category=${item.slug}`} className={category === item.slug ? "text-white" : "text-muted"}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="glass rounded-[1.4rem] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((item) => (
                <Link key={item.slug} href={`/blog?tag=${item.slug}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="glass rounded-[1.4rem] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Popular</p>
            <div className="mt-4 grid gap-3">
              {popular.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="text-sm hover:text-accent">
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
