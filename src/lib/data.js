import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getSettings = cache(async () => {
  const rows = await prisma.siteSetting.findMany();
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
});

export const getSocialLinks = cache(async () => {
  return prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } });
});

export const getActiveServices = cache(async () => {
  return prisma.service.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
  });
});

export const getServiceBySlug = cache(async (slug) => {
  return prisma.service.findFirst({
    where: { slug, status: "active" },
    include: {
      portfolios: {
        where: { status: "published" },
        orderBy: { sortOrder: "asc" },
        take: 6,
      },
    },
  });
});

export const getPublishedPortfolio = cache(async () => {
  return prisma.portfolio.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
});

export const getPortfolioBySlug = cache(async (slug) => {
  return prisma.portfolio.findFirst({
    where: { slug, status: "published" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      service: true,
    },
  });
});

export const getRelatedPortfolio = cache(async (slug, category) => {
  return prisma.portfolio.findMany({
    where: {
      status: "published",
      slug: { not: slug },
      category,
    },
    take: 3,
    orderBy: { sortOrder: "asc" },
  });
});

export const getActiveTeam = cache(async () => {
  return prisma.teamMember.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
  });
});

export const getActiveTestimonials = cache(async () => {
  return prisma.testimonial.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
  });
});

export const getActiveClients = cache(async () => {
  return prisma.client.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
  });
});

export const getStatistics = cache(async () => {
  return prisma.statistic.findMany({ orderBy: { sortOrder: "asc" } });
});

export const getTechnologies = cache(async () => {
  return prisma.technology.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
  });
});

export const getProcessSteps = cache(async () => {
  return prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });
});

export async function getHomeData() {
  const [
    settings,
    socials,
    services,
    stats,
    portfolio,
    testimonials,
    clients,
    team,
    technologies,
    process,
  ] = await Promise.all([
    getSettings(),
    getSocialLinks(),
    getActiveServices(),
    getStatistics(),
    prisma.portfolio.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
    getActiveTestimonials(),
    getActiveClients(),
    prisma.teamMember.findMany({
      where: { status: "active" },
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
    getTechnologies(),
    getProcessSteps(),
  ]);

  return {
    settings,
    socials,
    services,
    stats,
    portfolio,
    testimonials,
    clients,
    team,
    technologies,
    process,
  };
}

export async function getPublishedPosts({
  category,
  tag,
  q,
  take = 12,
  skip = 0,
} = {}) {
  const where = {
    published: true,
    ...(category ? { category: { slug: category } } : {}),
    ...(tag ? { tags: { some: { tag: { slug: tag } } } } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            { content: { contains: q } },
          ],
        }
      : {}),
  };

  const [posts, total, categories, tags, featured, popular] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take,
      skip,
      include: {
        author: { select: { name: true, email: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    }),
    prisma.blogPost.count({ where }),
    prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
    prisma.blogPost.findFirst({
      where: { published: true, featured: true },
      include: {
        author: { select: { name: true } },
        category: true,
      },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true, popular: true },
      take: 4,
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
  ]);

  return { posts, total, categories, tags, featured, popular };
}

export const getPostBySlug = cache(async (slug) => {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
    include: {
      author: { select: { name: true, email: true } },
      category: true,
      tags: { include: { tag: true } },
    },
  });
});

export async function getRelatedPosts(post) {
  return prisma.blogPost.findMany({
    where: {
      published: true,
      slug: { not: post.slug },
      categoryId: post.categoryId,
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });
}

export async function getAdminCounts() {
  const [
    projects,
    clients,
    team,
    testimonials,
    posts,
    messages,
    unread,
  ] = await Promise.all([
    prisma.portfolio.count(),
    prisma.client.count(),
    prisma.teamMember.count(),
    prisma.testimonial.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "new" } }),
  ]);

  return { projects, clients, team, testimonials, posts, messages, unread };
}
