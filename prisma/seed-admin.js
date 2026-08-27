import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.count();
  if (existing > 0) {
    console.log("Database already has data. Skipping admin seed.");
    return;
  }

  const password = await bcrypt.hash("MayonityAdmin2050!", 12);

  await prisma.user.create({
    data: {
      email: "admin@mayonity.com",
      password,
      name: "Mayonity Admin",
      role: "admin",
    },
  });

  const settings = {
    siteName: "Mayonity",
    tagline: "We Build What Comes Next.",
    description:
      "Mayonity is a software development company creating intelligent digital experiences, powerful web applications, mobile products and e-commerce ecosystems for businesses ready for the future.",
    email: "hello@mayonity.com",
    phone: "+1 (415) 555-2048",
    address: "Remote-first · Serving teams worldwide",
    businessHours: "Mon–Fri, 9:00–18:00",
    seoDefaultTitle: "Mayonity — Software for What Comes Next",
    seoDefaultDescription:
      "Mayonity turns ideas into digital products, experiences and technology built for the future. Web, mobile, e-commerce, UI/UX and consulting.",
    ogImage: "/og.jpg",
    careersNote:
      "We hire designers, engineers and strategists who want to build products that last. Send a note through Contact.",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.create({ data: { key, value } });
  }

  console.log("Admin user created: admin@mayonity.com");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
