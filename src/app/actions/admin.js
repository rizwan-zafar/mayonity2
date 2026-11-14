"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import {
  clearSessionCookie,
  createSessionToken,
  requireAdmin,
  setSessionCookie,
} from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { readingTimeFrom, slugify } from "@/lib/utils";
import { isReservedLocationSlug } from "@/lib/locations";
import { revalidatePath } from "next/cache";

function jsonList(value) {
  return JSON.stringify(
    String(value || "")
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)
  );
}

function faqsFromForm(formData) {
  const questions = formData.getAll("faqQuestion");
  const answers = formData.getAll("faqAnswer");
  const items = [];
  for (let i = 0; i < questions.length; i++) {
    const question = String(questions[i] || "").trim();
    const answer = String(answers[i] || "").trim();
    if (!question || !answer) continue;
    items.push({ question, answer, sortOrder: items.length });
  }
  return JSON.stringify(items);
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function loginAction(prev, formData) {
  const email = String(formData.get("email") || "").trim();
  const parsed = loginSchema.safeParse({
    email,
    password: String(formData.get("password") || ""),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password.", email };
  }

  const headerList = await headers();
  const limited = rateLimit(`login:${getClientIp(headerList)}`, 8, 15 * 60 * 1000);
  if (!limited.ok) {
    return { error: "Too many attempts. Wait and try again.", email: parsed.data.email };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || user.role !== "admin") {
    return { error: "Invalid credentials.", email: parsed.data.email };
  }
  const ok = await bcrypt.compare(parsed.data.password, user.password);
  if (!ok) return { error: "Invalid credentials.", email: parsed.data.email };

  const token = await createSessionToken(user);
  await setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

async function guard() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");
  return session;
}

export async function saveService(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const name = String(formData.get("name") || "");
  const data = {
    name,
    slug: slugify(formData.get("slug") || name),
    seoTitle: String(formData.get("seoTitle") || "").trim() || null,
    metaDescription: String(formData.get("metaDescription") || "").trim() || null,
    number: String(formData.get("number") || ""),
    shortDesc: String(formData.get("shortDesc") || ""),
    description: String(formData.get("description") || ""),
    whatWeBuild: String(formData.get("whatWeBuild") || ""),
    approach: String(formData.get("approach") || ""),
    technologies: jsonList(formData.get("technologies")),
    benefits: jsonList(formData.get("benefits")),
    features: jsonList(formData.get("features")),
    faqs: faqsFromForm(formData),
    icon: String(formData.get("icon") || "spark"),
    image: String(formData.get("image") || "") || null,
    category: String(formData.get("category") || "Web"),
    status: String(formData.get("status") || "active"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  revalidatePublic();
  redirect("/admin/services");
}

export async function deleteService(formData) {
  await guard();
  await prisma.service.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function saveLocation(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const name = String(formData.get("name") || "");
  const slug = slugify(formData.get("slug") || name);
  if (isReservedLocationSlug(slug)) {
    redirect("/admin/locations?error=reserved-slug");
  }
  const data = {
    name,
    slug,
    seoTitle: String(formData.get("seoTitle") || "").trim() || null,
    metaDescription: String(formData.get("metaDescription") || "").trim() || null,
    status: String(formData.get("status") || "draft"),
    sortOrder: Number(formData.get("sortOrder") || 0),
    eyebrow: String(formData.get("eyebrow") || "").trim() || null,
    h1: String(formData.get("h1") || ""),
    intro: String(formData.get("intro") || ""),
    whyTitle: String(formData.get("whyTitle") || "").trim() || null,
    whyBody: String(formData.get("whyBody") || ""),
    processTitle: String(formData.get("processTitle") || "").trim() || null,
    processBody: String(formData.get("processBody") || ""),
    industries: jsonList(formData.get("industries")),
    cities: jsonList(formData.get("cities")),
    faqs: faqsFromForm(formData),
  };
  if (id) await prisma.location.update({ where: { id }, data });
  else await prisma.location.create({ data });
  revalidatePublic();
  revalidatePath(`/${slug}`);
  redirect("/admin/locations");
}

export async function deleteLocation(formData) {
  await guard();
  const item = await prisma.location.findUnique({
    where: { id: Number(formData.get("id")) },
    select: { slug: true },
  });
  await prisma.location.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
  if (item?.slug) revalidatePath(`/${item.slug}`);
}

export async function savePortfolio(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const name = String(formData.get("name") || "");
  const data = {
    name,
    slug: slugify(formData.get("slug") || name),
    seoTitle: String(formData.get("seoTitle") || "").trim() || null,
    metaDescription: String(formData.get("metaDescription") || "").trim() || null,
    client: String(formData.get("client") || ""),
    industry: String(formData.get("industry") || ""),
    category: String(formData.get("category") || "Web"),
    shortDesc: String(formData.get("shortDesc") || ""),
    overview: String(formData.get("overview") || ""),
    challenge: String(formData.get("challenge") || ""),
    solution: String(formData.get("solution") || ""),
    design: String(formData.get("design") || ""),
    technology: String(formData.get("technology") || ""),
    features: jsonList(formData.get("features")),
    results: String(formData.get("results") || ""),
    technologies: jsonList(formData.get("technologies")),
    services: jsonList(formData.get("services")),
    projectUrl: String(formData.get("projectUrl") || "") || null,
    image: String(formData.get("image") || ""),
    featured: formData.get("featured") === "on",
    status: String(formData.get("status") || "published"),
    sortOrder: Number(formData.get("sortOrder") || 0),
    serviceId: formData.get("serviceId") ? Number(formData.get("serviceId")) : null,
  };
  const gallery = formData.getAll("gallery").map(String).filter(Boolean);
  const saved = id
    ? await prisma.portfolio.update({ where: { id }, data })
    : await prisma.portfolio.create({ data });

  await prisma.portfolioImage.deleteMany({ where: { portfolioId: saved.id } });
  if (gallery.length) {
    await prisma.portfolioImage.createMany({
      data: gallery.map((url, index) => ({
        url,
        alt: `${saved.name} ${index + 1}`,
        sortOrder: index + 1,
        portfolioId: saved.id,
      })),
    });
  }
  revalidatePublic();
  redirect("/admin/portfolio");
}

export async function deletePortfolio(formData) {
  await guard();
  await prisma.portfolio.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function saveTeam(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    position: String(formData.get("position") || ""),
    bio: String(formData.get("bio") || ""),
    photo: String(formData.get("photo") || ""),
    skills: jsonList(formData.get("skills")),
    linkedin: String(formData.get("linkedin") || "") || null,
    twitter: String(formData.get("twitter") || "") || null,
    github: String(formData.get("github") || "") || null,
    dribbble: String(formData.get("dribbble") || "") || null,
    status: String(formData.get("status") || "active"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.teamMember.update({ where: { id }, data });
  else await prisma.teamMember.create({ data });
  revalidatePublic();
  redirect("/admin/team");
}

export async function deleteTeam(formData) {
  await guard();
  await prisma.teamMember.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function saveTestimonial(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    position: String(formData.get("position") || ""),
    company: String(formData.get("company") || ""),
    photo: String(formData.get("photo") || ""),
    quote: String(formData.get("quote") || ""),
    rating: Number(formData.get("rating") || 5),
    status: String(formData.get("status") || "active"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePublic();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData) {
  await guard();
  await prisma.testimonial.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function saveClient(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    logo: String(formData.get("logo") || ""),
    url: String(formData.get("url") || "") || null,
    status: String(formData.get("status") || "active"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.client.update({ where: { id }, data });
  else await prisma.client.create({ data });
  revalidatePublic();
  redirect("/admin/clients");
}

export async function deleteClient(formData) {
  await guard();
  await prisma.client.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function savePost(formData) {
  const session = await guard();
  const id = Number(formData.get("id") || 0);
  const title = String(formData.get("title") || "");
  const data = {
    title,
    slug: slugify(formData.get("slug") || title),
    seoTitle: String(formData.get("seoTitle") || "") || null,
    metaDescription: String(formData.get("metaDescription") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    featuredImage: String(formData.get("featuredImage") || ""),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    popular: formData.get("popular") === "on",
    publishedAt: formData.get("publishedAt")
      ? new Date(String(formData.get("publishedAt")))
      : new Date(),
    readingTime: readingTimeFrom(String(formData.get("content") || "")),
    categoryId: Number(formData.get("categoryId")),
    authorId: Number(session.sub),
    teamMemberId: (() => {
      const raw = String(formData.get("teamMemberId") || "").trim();
      if (!raw) return null;
      const id = Number(raw);
      return Number.isFinite(id) && id > 0 ? id : null;
    })(),
  };
  const tagIds = formData
    .getAll("tagIds")
    .map((item) => Number(item))
    .filter(Boolean);

  const saved = id
    ? await prisma.blogPost.update({ where: { id }, data })
    : await prisma.blogPost.create({ data });

  await prisma.blogPostTag.deleteMany({ where: { postId: saved.id } });
  if (tagIds.length) {
    await prisma.blogPostTag.createMany({
      data: tagIds.map((tagId) => ({ postId: saved.id, tagId })),
    });
  }
  revalidatePublic();
  redirect("/admin/blog");
}

export async function deletePost(formData) {
  await guard();
  await prisma.blogPost.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function saveCategory(formData) {
  await guard();
  const name = String(formData.get("name") || "");
  await prisma.blogCategory.create({
    data: { name, slug: slugify(formData.get("slug") || name) },
  });
  revalidatePublic();
}

export async function saveTag(formData) {
  await guard();
  const name = String(formData.get("name") || "");
  await prisma.blogTag.create({
    data: { name, slug: slugify(formData.get("slug") || name) },
  });
  revalidatePublic();
}

export async function saveStatistic(formData) {
  await guard();
  const id = Number(formData.get("id"));
  await prisma.statistic.update({
    where: { id },
    data: {
      label: String(formData.get("label") || ""),
      value: Number(formData.get("value") || 0),
      suffix: String(formData.get("suffix") || "+"),
    },
  });
  revalidatePublic();
}

export async function updateMessageStatus(formData) {
  await guard();
  await prisma.contactMessage.update({
    where: { id: Number(formData.get("id")) },
    data: { status: String(formData.get("status")) },
  });
}

export async function saveSettings(formData) {
  await guard();
  const keys = [
    "siteName",
    "tagline",
    "description",
    "email",
    "phone",
    "address",
    "businessHours",
    "seoDefaultTitle",
    "seoDefaultDescription",
    "careersNote",
  ];
  for (const key of keys) {
    const value = String(formData.get(key) || "");
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePublic();
}

export async function saveSocial(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const data = {
    platform: String(formData.get("platform") || ""),
    url: String(formData.get("url") || ""),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.socialLink.update({ where: { id }, data });
  else await prisma.socialLink.create({ data });
  revalidatePublic();
}

export async function deleteSocial(formData) {
  await guard();
  await prisma.socialLink.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}

export async function saveTechnology(formData) {
  await guard();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || "Frontend"),
    status: String(formData.get("status") || "active"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.technology.update({ where: { id }, data });
  else await prisma.technology.create({ data });
  revalidatePublic();
  redirect("/admin/settings");
}

export async function deleteTechnology(formData) {
  await guard();
  await prisma.technology.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePublic();
}
