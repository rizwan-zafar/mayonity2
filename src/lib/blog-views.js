import { prisma } from "@/lib/prisma";

/** Increment views without touching Prisma @updatedAt (sitemap lastmod stays honest). */
export async function incrementBlogPostViews(postId) {
  await prisma.$executeRaw`UPDATE BlogPost SET views = views + 1 WHERE id = ${postId}`;
}
