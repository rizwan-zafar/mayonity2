import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function json(value) {
  return JSON.stringify(value);
}

async function main() {
  const existing = await prisma.user.count();
  if (existing > 0) {
    console.log("Database already has data. Skipping seed.");
    return;
  }

  const password = await bcrypt.hash("MayonityAdmin2050!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@mayonity.com" },
    update: { name: "Mayonity Admin" },
    create: {
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
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  const socials = [
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/mayonity", sortOrder: 1 },
    { platform: "Facebook", url: "https://www.facebook.com/mayonity", sortOrder: 2 },
    { platform: "Instagram", url: "https://www.instagram.com/mayonity", sortOrder: 3 },
    { platform: "X", url: "https://x.com/mayonity", sortOrder: 4 },
    { platform: "GitHub", url: "https://github.com/mayonity", sortOrder: 5 },
  ];

  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({ data: socials });

  const stats = [
    { key: "projects", label: "Projects Delivered", value: 500, suffix: "+", sortOrder: 1 },
    { key: "team", label: "Team Members", value: 50, suffix: "+", sortOrder: 2 },
    { key: "years", label: "Years of Experience", value: 10, suffix: "+", sortOrder: 3 },
    { key: "clients", label: "Happy Clients", value: 100, suffix: "+", sortOrder: 4 },
    { key: "coffee", label: "Cups of Coffee", value: 25000, suffix: "+", sortOrder: 5 },
  ];

  for (const item of stats) {
    await prisma.statistic.upsert({
      where: { key: item.key },
      update: item,
      create: item,
    });
  }

  const process = [
    { number: "01", title: "Discover", description: "We listen, map the problem and find the real opportunity underneath the brief.", sortOrder: 1 },
    { number: "02", title: "Strategize", description: "We shape a product direction that balances ambition, users and commercial reality.", sortOrder: 2 },
    { number: "03", title: "Design", description: "Interfaces, systems and narratives that feel inevitable — simple, spatial, human.", sortOrder: 3 },
    { number: "04", title: "Build", description: "Engineering that is fast, scalable and precise. The product becomes real.", sortOrder: 4 },
    { number: "05", title: "Test", description: "Quality, performance and accessibility are treated as product features, not afterthoughts.", sortOrder: 5 },
    { number: "06", title: "Launch", description: "We ship with care: infrastructure, analytics, handoff and a calm first-week plan.", sortOrder: 6 },
    { number: "07", title: "Evolve", description: "Products are living systems. We keep improving after the launch lights fade.", sortOrder: 7 },
  ];

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({ data: process });

  const technologies = [
    { name: "React", category: "Frontend", sortOrder: 1 },
    { name: "Next.js", category: "Frontend", sortOrder: 2 },
    { name: "JavaScript", category: "Frontend", sortOrder: 3 },
    { name: "HTML", category: "Frontend", sortOrder: 4 },
    { name: "CSS", category: "Frontend", sortOrder: 5 },
    { name: "Tailwind", category: "Frontend", sortOrder: 6 },
    { name: "Node.js", category: "Backend", sortOrder: 7 },
    { name: "APIs", category: "Backend", sortOrder: 8 },
    { name: "Databases", category: "Backend", sortOrder: 9 },
    { name: "Native", category: "Mobile", sortOrder: 10 },
    { name: "Hybrid", category: "Mobile", sortOrder: 11 },
    { name: "Cross-platform", category: "Mobile", sortOrder: 12 },
    { name: "WordPress", category: "CMS", sortOrder: 13 },
    { name: "Shopify", category: "E-Commerce", sortOrder: 14 },
    { name: "Custom E-Commerce", category: "E-Commerce", sortOrder: 15 },
    { name: "Docker", category: "Cloud / Infrastructure", sortOrder: 16 },
    { name: "Cloud platforms", category: "Cloud / Infrastructure", sortOrder: 17 },
    { name: "CI/CD", category: "Cloud / Infrastructure", sortOrder: 18 },
  ];

  await prisma.technology.deleteMany();
  await prisma.technology.createMany({ data: technologies });

  const services = [
    {
      slug: "web-designing",
      name: "Website Designing",
      number: "01",
      category: "Web",
      icon: "layout",
      shortDesc: "Front-end web designing using modern design technologies and future-focused interfaces.",
      description: "We design websites as living products — spatial, calm and precise. Every screen is composed for conversion, clarity and a sense of tomorrow.",
      whatWeBuild: "Brand websites, product marketing sites, immersive landing experiences and design systems that scale across pages and campaigns.",
      approach: "Research, visual direction, high-fidelity interface design, motion language and a developer-ready handoff. We design with engineering in the room.",
      technologies: json(["Figma", "HTML", "CSS", "Tailwind", "Motion"]),
      benefits: json(["Future-facing visual identity", "Conversion-first composition", "Accessible, responsive systems", "Motion that explains, not distracts"]),
      features: json(["Art direction", "Responsive layouts", "Design systems", "Interactive prototypes"]),
      sortOrder: 1,
    },
    {
      slug: "web-development",
      name: "Website Development",
      number: "02",
      category: "Web",
      icon: "code",
      shortDesc: "Modern, scalable and high-performance web applications built using cutting-edge technologies.",
      description: "We engineer web products that stay fast as they grow. Architecture, performance and maintainability are designed in from day one.",
      whatWeBuild: "Marketing platforms, customer portals, SaaS products, internal tools and content-driven websites on modern JavaScript stacks.",
      approach: "We start with the product model, then choose the simplest architecture that can still scale. Next.js, APIs and databases — composed cleanly.",
      technologies: json(["Next.js", "React", "Node.js", "MySQL", "Prisma", "APIs"]),
      benefits: json(["High performance", "SEO-first rendering", "Secure by default", "Clean, scalable code"]),
      features: json(["App Router", "CMS integrations", "Authentication", "Dashboards", "API platforms"]),
      sortOrder: 2,
    },
    {
      slug: "wordpress-solutions",
      name: "WordPress Solutions",
      number: "03",
      category: "WordPress",
      icon: "layers",
      shortDesc: "High-quality WordPress solutions designed to create engaging and manageable digital experiences.",
      description: "WordPress, treated as a product — not a template. We build editorial systems that marketing teams can actually run.",
      whatWeBuild: "Custom themes, headless WordPress, editorial workflows, landing page systems and performance-tuned WordPress platforms.",
      approach: "Content model first. Then theme, blocks, speed and security. The result feels custom, and stays editable.",
      technologies: json(["WordPress", "PHP", "Custom themes", "WooCommerce", "Headless CMS"]),
      benefits: json(["Easy content ownership", "Custom, on-brand UI", "Performance and security hardening", "Room to grow"]),
      features: json(["Custom themes", "Block systems", "WooCommerce", "Migrations"]),
      sortOrder: 3,
    },
    {
      slug: "app-designing",
      name: "App Designing",
      number: "04",
      category: "Mobile",
      icon: "smartphone",
      shortDesc: "Engaging and interactive mobile experiences designed for modern users.",
      description: "Mobile design with restraint. We compose gestures, hierarchy and rhythm so an app feels native to the hand — and to the brand.",
      whatWeBuild: "iOS and Android product design, design systems for mobile, onboarding flows and interaction prototypes.",
      approach: "We map the jobs-to-be-done, then design a small number of perfect flows rather than a catalogue of screens.",
      technologies: json(["Figma", "Prototyping", "iOS HIG", "Material Design"]),
      benefits: json(["Native-feeling interactions", "Clear information architecture", "Brand-consistent systems", "Faster engineering handoff"]),
      features: json(["Flow mapping", "UI kits", "Motion specs", "Usability reviews"]),
      sortOrder: 4,
    },
    {
      slug: "app-development",
      name: "App Development",
      number: "05",
      category: "Mobile",
      icon: "cpu",
      shortDesc: "Native, hybrid and cross-platform mobile applications built for performance and scalability.",
      description: "We build mobile products that people keep. Stable, fast, and connected to the rest of your digital ecosystem.",
      whatWeBuild: "Customer apps, operations apps, companion products and cross-platform releases with shared design language.",
      approach: "Choose the right runtime for the product — native where it matters, cross-platform where speed-to-market matters more.",
      technologies: json(["React Native", "Native iOS", "Native Android", "APIs", "Push", "Analytics"]),
      benefits: json(["Store-ready quality", "Shared code where useful", "Reliable releases", "Integrated backends"]),
      features: json(["Auth", "Offline-first patterns", "Payments", "Notifications"]),
      sortOrder: 5,
    },
    {
      slug: "ecommerce",
      name: "E-Commerce Web & App",
      number: "06",
      category: "E-Commerce",
      icon: "bag",
      shortDesc: "Flexible and engaging e-commerce platforms designed to help businesses sell and grow digitally.",
      description: "Commerce as an experience, not a catalogue. We design and build stores that feel premium and convert with less friction.",
      whatWeBuild: "Custom storefronts, Shopify experiences, marketplace logic, and mobile commerce apps connected to operations.",
      approach: "We map the buying journey, then engineer checkout, catalog and content so the brand stays present until the order is placed.",
      technologies: json(["Shopify", "Custom E-Commerce", "Next.js", "Payments", "Headless commerce"]),
      benefits: json(["Higher conversion", "Brand-led storefronts", "Operationally practical", "Room for complex catalogs"]),
      features: json(["Product systems", "Checkout", "Subscriptions", "Inventory hooks"]),
      sortOrder: 6,
    },
    {
      slug: "ui-ux",
      name: "UI/UX Designing",
      number: "07",
      category: "UI/UX",
      icon: "spark",
      shortDesc: "Modern, responsive and intuitive interfaces based on current and emerging UI/UX trends.",
      description: "We design the relationship between people and software. Research, systems, and interfaces that reduce cognitive load.",
      whatWeBuild: "Product UX, design systems, dashboard experiences, prototypes and usability programs for web and mobile.",
      approach: "Understand the user, constrain the problem, then design an interface language that can grow without getting noisy.",
      technologies: json(["Figma", "Research", "Prototyping", "Accessibility", "Design tokens"]),
      benefits: json(["Clearer products", "Faster decisions", "Accessible by design", "Systems, not one-off screens"]),
      features: json(["UX research", "Wireframes", "UI systems", "Usability testing"]),
      sortOrder: 7,
    },
    {
      slug: "data-entry",
      name: "Data Entry",
      number: "08",
      category: "Other",
      icon: "table",
      shortDesc: "Fast, accurate and reliable data-entry solutions for spreadsheets, databases and business operations.",
      description: "Clean data is infrastructure. We help teams migrate, structure and maintain the information their products depend on.",
      whatWeBuild: "Spreadsheet operations, database population, catalog structuring, CRM hygiene and migration support.",
      approach: "Define the schema, set quality rules, then execute with review loops so accuracy stays high at volume.",
      technologies: json(["Spreadsheets", "Databases", "CRM", "QA workflows"]),
      benefits: json(["Accuracy at volume", "Faster operations", "Cleaner systems", "Human review where it matters"]),
      features: json(["Structured intake", "Validation", "Reporting", "Handoff"]),
      sortOrder: 8,
    },
    {
      slug: "suggestions-solutions",
      name: "Suggestions & Solutions",
      number: "09",
      category: "Other",
      icon: "compass",
      shortDesc: "Technology consulting, digital strategy and practical solutions to help businesses solve complex problems.",
      description: "When the problem is unclear, we help you see it. Architecture reviews, product strategy and a practical path forward.",
      whatWeBuild: "Digital strategy, technical audits, product roadmaps, vendor selection and implementation plans.",
      approach: "We diagnose before we prescribe. Then we recommend the smallest set of moves that create the largest durable advantage.",
      technologies: json(["Workshops", "Architecture", "Roadmapping", "Delivery planning"]),
      benefits: json(["Clarity before spend", "Risk reduction", "A usable roadmap", "A partner, not a slide deck"]),
      features: json(["Audits", "Strategy sprints", "Solution design", "Advisory retainers"]),
      sortOrder: 9,
    },
  ];

  const serviceRecords = {};
  for (const service of services) {
    serviceRecords[service.slug] = await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  const portfolioItems = [
    {
      slug: "lumen-commerce",
      name: "Lumen Commerce",
      client: "Lumen Atelier",
      industry: "Fashion retail",
      category: "E-Commerce",
      image: "/images/portfolio/lumen.svg",
      projectUrl: "https://mayonity.com",
      featured: true,
      serviceId: serviceRecords.ecommerce.id,
      shortDesc: "A headless fashion storefront with editorial storytelling and a quiet, high-conversion checkout.",
      overview: "Lumen needed a commerce experience that felt like a magazine, not a grid of SKUs. We built a custom storefront connected to a practical operations stack.",
      challenge: "The previous theme could not carry the brand, and checkout drop-off was high on mobile.",
      solution: "A Next.js storefront with a refined product system, lookbooks, and a streamlined checkout path.",
      design: "Soft contrast, large photography, and crystal-clear product hierarchy. Motion is used only to confirm action.",
      technology: "Headless commerce, a custom catalog API, and a performance budget that keeps LCP low on product pages.",
      features: json(["Lookbook merchandising", "Size intelligence", "One-step checkout", "Inventory sync"]),
      results: "Conversion lifted. Mobile sessions finally completed. The brand finally looked like the product.",
      technologies: json(["Next.js", "Headless commerce", "Payments", "Tailwind"]),
      services: json(["E-Commerce", "UI/UX", "Website Development"]),
      sortOrder: 1,
    },
    {
      slug: "northline-ops",
      name: "Northline Ops",
      client: "Northline Logistics",
      industry: "Logistics",
      category: "Web",
      image: "/images/portfolio/northline.svg",
      featured: true,
      serviceId: serviceRecords["web-development"].id,
      shortDesc: "An operations platform that turned scattered spreadsheets into a live control room.",
      overview: "Northline ran a growing network on disconnected files. We designed and shipped a web platform for dispatch, tracking and client visibility.",
      challenge: "Too many tools, no single source of truth, and a team that could not see exceptions until they became delays.",
      solution: "A modular operations app with role-based views, live statuses and a client portal.",
      design: "Dense but calm. Data-first screens with generous type, clear states and almost no chrome.",
      technology: "A Next.js application over a MySQL model, with APIs for carriers and notifications.",
      features: json(["Live shipment states", "Exception queues", "Client portal", "Audit history"]),
      results: "Teams stopped reconciling files. Clients stopped asking 'where is it?'",
      technologies: json(["Next.js", "Node.js", "MySQL", "APIs"]),
      services: json(["Website Development", "UI/UX", "Suggestions & Solutions"]),
      sortOrder: 2,
    },
    {
      slug: "halo-health",
      name: "Halo Health",
      client: "Halo Clinic Network",
      industry: "Healthcare",
      category: "Mobile",
      image: "/images/portfolio/halo.svg",
      featured: true,
      serviceId: serviceRecords["app-development"].id,
      shortDesc: "A patient companion app with scheduling, records and a deliberately un-anxious interface.",
      overview: "Halo wanted patients to feel looked after between visits. We designed and built a mobile companion for appointments, reminders and records.",
      challenge: "Existing apps in the space were noisy, clinical and hard to trust on first open.",
      solution: "A cross-platform app with a small set of perfect flows and a tone that stays human.",
      design: "Large tap targets, restrained color, and copy that never shouts. Accessibility was a requirement, not a phase.",
      technology: "Cross-platform client, secure APIs, and careful session handling for sensitive data.",
      features: json(["Appointments", "Secure records", "Reminders", "Care team messaging"]),
      results: "No-shows dropped. Patients completed onboarding without a call.",
      technologies: json(["React Native", "APIs", "Secure auth"]),
      services: json(["App Designing", "App Development", "UI/UX"]),
      sortOrder: 3,
    },
    {
      slug: "orbit-cms",
      name: "Orbit Editorial",
      client: "Orbit Media",
      industry: "Publishing",
      category: "WordPress",
      image: "/images/portfolio/orbit.svg",
      serviceId: serviceRecords["wordpress-solutions"].id,
      shortDesc: "A custom WordPress system for a newsroom that publishes like a product team.",
      overview: "Orbit needed speed without giving up craft. We rebuilt their publishing stack as a custom WordPress product.",
      challenge: "Editors were fighting the CMS. Pages were slow. The brand leaked through inconsistent templates.",
      solution: "A block system, a performance pass, and templates that make the right layout the easy layout.",
      design: "Typographic, sharp, and built for scanning. Article templates carry hierarchy without decoration.",
      technology: "Custom WordPress theme, tuned queries, and a caching strategy that stays out of the editors' way.",
      features: json(["Custom blocks", "Article templates", "Preview workflow", "SEO primitives"]),
      results: "Editors ship faster. Pages feel immediate. The archive is finally searchable.",
      technologies: json(["WordPress", "Custom themes", "SEO"]),
      services: json(["WordPress Solutions", "Website Designing"]),
      sortOrder: 4,
    },
    {
      slug: "aether-bank",
      name: "Aether Wealth",
      client: "Aether",
      industry: "Fintech",
      category: "UI/UX",
      image: "/images/portfolio/aether.svg",
      serviceId: serviceRecords["ui-ux"].id,
      shortDesc: "A design system for a wealth product that had to feel expensive without becoming cold.",
      overview: "Aether was rebuilding their customer product. We created the UX model and a design system the engineering team could actually implement.",
      challenge: "The product mixed marketing language with dense financial data. Users got lost between intent and numbers.",
      solution: "A spatial information architecture, a tokenized UI system, and prototypes of the five core journeys.",
      design: "Glass surfaces, precise type, and data visualizations that explain rather than decorate.",
      technology: "Design tokens mapped to a React implementation so design and engineering stayed aligned.",
      features: json(["Design tokens", "Journey maps", "Dashboard UX", "Component library"]),
      results: "Engineering velocity improved. Onboarding completion rose. The product finally felt like one company.",
      technologies: json(["Figma", "Design tokens", "React"]),
      services: json(["UI/UX Designing", "Website Designing"]),
      sortOrder: 5,
    },
    {
      slug: "fieldwork-app",
      name: "Fieldwork",
      client: "Fieldwork Co.",
      industry: "Field services",
      category: "Mobile",
      image: "/images/portfolio/fieldwork.svg",
      serviceId: serviceRecords["app-designing"].id,
      shortDesc: "A field service interface designed for gloves, sunlight and very little patience.",
      overview: "Technicians needed an app that worked in the world, not in a conference room. We designed Fieldwork for real conditions.",
      challenge: "Previous software assumed a desk, a mouse and perfect connectivity.",
      solution: "Large controls, offline-aware flows, and a status model that makes the next action obvious.",
      design: "High contrast, short copy, and a visual language that survives glare.",
      technology: "A mobile-first prototype system handed to engineering with interaction specs and empty states.",
      features: json(["Offline job lists", "Photo capture", "Signature flows", "Status sync"]),
      results: "Jobs closed in the field. Support tickets about 'where do I tap' disappeared.",
      technologies: json(["Figma", "Prototyping", "Mobile UX"]),
      services: json(["App Designing", "UI/UX Designing"]),
      sortOrder: 6,
    },
  ];

  for (const item of portfolioItems) {
    const { images, ...data } = {
      ...item,
      images: [
        { url: item.image, alt: `${item.name} hero`, sortOrder: 1 },
        { url: item.image, alt: `${item.name} detail`, sortOrder: 2 },
      ],
    };
    await prisma.portfolio.upsert({
      where: { slug: data.slug },
      update: data,
      create: {
        ...data,
        images: { create: images },
      },
    });
  }

  const clients = [
    { name: "Lumen", logo: "/images/clients/lumen.svg", sortOrder: 1 },
    { name: "Northline", logo: "/images/clients/northline.svg", sortOrder: 2 },
    { name: "Halo", logo: "/images/clients/halo.svg", sortOrder: 3 },
    { name: "Orbit", logo: "/images/clients/orbit.svg", sortOrder: 4 },
    { name: "Aether", logo: "/images/clients/aether.svg", sortOrder: 5 },
    { name: "Fieldwork", logo: "/images/clients/fieldwork.svg", sortOrder: 6 },
    { name: "Kite", logo: "/images/clients/kite.svg", sortOrder: 7 },
    { name: "Vertex", logo: "/images/clients/vertex.svg", sortOrder: 8 },
  ];

  await prisma.client.deleteMany();
  await prisma.client.createMany({ data: clients });

  const team = [
    { name: "Ayaan Malik", position: "Founder & Product Lead", bio: "Shapes Mayonity's point of view: design, engineering and business in one conversation.", photo: "/images/team/ayaan.svg", skills: json(["Product strategy", "Systems thinking", "Client partnership"]), linkedin: "https://www.linkedin.com", github: "https://github.com", sortOrder: 1 },
    { name: "Sofia Rahman", position: "Design Director", bio: "Builds visual languages that feel inevitable. Obsessed with type, space and restraint.", photo: "/images/team/sofia.svg", skills: json(["Art direction", "UI systems", "Motion"]), dribbble: "https://dribbble.com", linkedin: "https://www.linkedin.com", sortOrder: 2 },
    { name: "Noah Patel", position: "Engineering Lead", bio: "Turns ambitious interfaces into software that stays fast. Architecture without ceremony.", photo: "/images/team/noah.svg", skills: json(["Next.js", "APIs", "Performance"]), github: "https://github.com", linkedin: "https://www.linkedin.com", sortOrder: 3 },
    { name: "Elena Voss", position: "Mobile Lead", bio: "Designs and ships mobile products that feel native to the hand and honest to the brand.", photo: "/images/team/elena.svg", skills: json(["iOS", "Android", "Cross-platform"]), linkedin: "https://www.linkedin.com", sortOrder: 4 },
    { name: "Jamal Ortega", position: "UX Researcher", bio: "Finds the real job to be done and protects users from unnecessary complexity.", photo: "/images/team/jamal.svg", skills: json(["Research", "IA", "Usability"]), linkedin: "https://www.linkedin.com", sortOrder: 5 },
    { name: "Hana Okonkwo", position: "Delivery Lead", bio: "Keeps ambitious work calm. Scope, quality and launch plans that teams can trust.", photo: "/images/team/hana.svg", skills: json(["Delivery", "QA", "Client success"]), linkedin: "https://www.linkedin.com", sortOrder: 6 },
  ];

  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({ data: team });

  const testimonials = [
    { name: "Clara Jensen", position: "CMO", company: "Lumen Atelier", photo: "/images/team/sofia.svg", quote: "Mayonity did not give us a theme. They gave us a store that finally feels like the brand — and it sells.", rating: 5, sortOrder: 1 },
    { name: "Marcus Hale", position: "COO", company: "Northline Logistics", photo: "/images/team/noah.svg", quote: "They understood the operation before they drew a screen. The platform paid for itself in the first quarter.", rating: 5, sortOrder: 2 },
    { name: "Priya Shah", position: "Head of Digital", company: "Halo Clinic Network", photo: "/images/team/elena.svg", quote: "The app is quiet, trustworthy and used. That is rarer than it should be in healthcare software.", rating: 5, sortOrder: 3 },
    { name: "Owen Blake", position: "Editor-in-Chief", company: "Orbit Media", photo: "/images/team/jamal.svg", quote: "Our CMS used to fight us. Now it disappears, which is the highest compliment I can give a publishing system.", rating: 5, sortOrder: 4 },
  ];

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });

  const categories = [
    { name: "Technology", slug: "technology" },
    { name: "Web Development", slug: "web-development" },
    { name: "Mobile Development", slug: "mobile-development" },
    { name: "UI/UX", slug: "ui-ux" },
    { name: "E-Commerce", slug: "ecommerce" },
    { name: "AI", slug: "ai" },
    { name: "Business", slug: "business" },
    { name: "Digital Transformation", slug: "digital-transformation" },
  ];

  const categoryMap = {};
  for (const category of categories) {
    categoryMap[category.slug] = await prisma.blogCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const tags = [
    { name: "Next.js", slug: "nextjs" },
    { name: "Product", slug: "product" },
    { name: "Design", slug: "design" },
    { name: "Performance", slug: "performance" },
    { name: "Strategy", slug: "strategy" },
    { name: "Mobile", slug: "mobile" },
  ];

  const tagMap = {};
  for (const tag of tags) {
    tagMap[tag.slug] = await prisma.blogTag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }

  const posts = [
    {
      slug: "designing-software-for-what-comes-next",
      title: "Designing software for what comes next",
      seoTitle: "Designing software for what comes next | Mayonity",
      metaDescription: "Why Mayonity treats design, engineering and business as one practice when building digital products for the future.",
      excerpt: "The companies that win the next decade will not look like software factories. They will look like product studios with engineering discipline.",
      featuredImage: "/images/blog/future.svg",
      categoryId: categoryMap["digital-transformation"].id,
      featured: true,
      popular: true,
      readingTime: 7,
      tagSlugs: ["product", "strategy", "design"],
      content: `## The next interface is a relationship

Software used to be a destination. Now it is a layer around work, commerce and care. The companies that understand this do not commission "a website". They commission a system.

Mayonity exists for that shift.

## Design is not decoration

A future-ready product is calm under complexity. That is a design problem and an engineering problem at the same time. If the interface is beautiful and the architecture is brittle, you do not have a product. You have a launch.

## What we actually build

We build websites, applications, commerce platforms and the strategy that decides what should exist. The work is specific. The ambition is not.

If you are building what comes next, the interface should already feel like it belongs there.`,
    },
    {
      slug: "why-performance-is-a-brand-decision",
      title: "Why performance is a brand decision",
      seoTitle: "Why performance is a brand decision | Mayonity",
      metaDescription: "Slow software feels cheap. Here is how Mayonity treats performance as part of brand, not a technical afterthought.",
      excerpt: "People do not say a site is slow. They say they do not trust it. Performance is how a brand feels in the first two seconds.",
      featuredImage: "/images/blog/performance.svg",
      categoryId: categoryMap["web-development"].id,
      popular: true,
      readingTime: 6,
      tagSlugs: ["performance", "nextjs", "product"],
      content: `## Speed is tone of voice

A delayed interaction is a broken sentence. Users fill the silence with doubt.

## What we measure

Largest contentful paint, interaction delay, and the weight of ambition. Motion should never be an apology for a heavy page.

## A practical bar

We prefer CSS and considered motion over spectacle. Three.js earns its place. It does not get a default seat.

That is how a 2050 aesthetic stays fast in 2026.`,
    },
    {
      slug: "mobile-products-that-respect-the-hand",
      title: "Mobile products that respect the hand",
      seoTitle: "Mobile products that respect the hand | Mayonity",
      metaDescription: "A point of view on mobile app design and development from Mayonity — fewer screens, better flows, native feeling software.",
      excerpt: "Most apps are websites wearing a smaller coat. The good ones are designed for thumbs, time and interrupted attention.",
      featuredImage: "/images/blog/mobile.svg",
      categoryId: categoryMap["mobile-development"].id,
      readingTime: 5,
      tagSlugs: ["mobile", "design"],
      content: `## Start with the job

If a technician is in sunlight, your contrast is a product requirement. If a patient is anxious, your copy is a clinical instrument.

## Native is a feeling

Cross-platform is a delivery choice. Native feeling is a design obligation.

## Ship fewer flows

We would rather perfect five journeys than sketch fifty screens. That is how mobile software becomes a habit.`,
    },
    {
      slug: "commerce-should-feel-like-the-brand",
      title: "Commerce should feel like the brand",
      seoTitle: "Commerce should feel like the brand | Mayonity",
      metaDescription: "How Mayonity builds e-commerce experiences that convert without looking like every other store.",
      excerpt: "People do not want another grid of products. They want to believe the thing they are about to buy belongs in their life.",
      featuredImage: "/images/blog/commerce.svg",
      categoryId: categoryMap.ecommerce.id,
      popular: true,
      readingTime: 6,
      tagSlugs: ["product", "design"],
      content: `## Storefronts are products

A theme can sell a commodity. A brand needs a system: merchandising, story, checkout and operations.

## Reduce friction, keep atmosphere

Checkout should be quiet. The brand should still be present. That is the tension we design for.

## Headless when it earns it

We use Shopify or custom commerce depending on the catalog, the team and the ambition — not the trend.`,
    },
    {
      slug: "ai-as-a-collaborator-not-a-costume",
      title: "AI as a collaborator, not a costume",
      seoTitle: "AI as a collaborator, not a costume | Mayonity",
      metaDescription: "Mayonity's view on building with AI: useful intelligence inside products, without cheap sci-fi theatrics.",
      excerpt: "The future is not neon brains. It is software that notices, suggests and gets out of the way.",
      featuredImage: "/images/blog/ai.svg",
      categoryId: categoryMap.ai.id,
      readingTime: 5,
      tagSlugs: ["strategy", "product"],
      content: `## Intelligence should be quiet

If a product needs to announce that it uses AI, the AI is probably not helping yet.

## Where it belongs

Search, operations, content systems, support, and decision support. Places where attention is expensive.

## Human + technology

Mayonity's work sits in that collaboration. We build the systems. People remain responsible for the outcome.`,
    },
    {
      slug: "a-design-system-is-a-business-system",
      title: "A design system is a business system",
      seoTitle: "A design system is a business system | Mayonity",
      metaDescription: "Why UI/UX systems pay for themselves in engineering speed, brand consistency and fewer product arguments.",
      excerpt: "Tokens, components and rules are not bureaucracy. They are how a company stops redesigning itself every quarter.",
      featuredImage: "/images/blog/system.svg",
      categoryId: categoryMap["ui-ux"].id,
      readingTime: 6,
      tagSlugs: ["design", "product"],
      content: `## Consistency is a cost-saving device

Every one-off screen is a meeting you will have again.

## What we deliver

A language: type, space, color, motion, components. Then the discipline to use it.

## The test

If a new engineer can build a correct screen without asking design, the system is working.`,
    },
  ];

  for (const post of posts) {
    const { tagSlugs, ...data } = post;
    const saved = await prisma.blogPost.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        published: true,
        publishedAt: new Date("2026-03-12"),
        authorId: admin.id,
      },
      create: {
        ...data,
        published: true,
        publishedAt: new Date("2026-03-12"),
        authorId: admin.id,
      },
    });

    await prisma.blogPostTag.deleteMany({ where: { postId: saved.id } });
    await prisma.blogPostTag.createMany({
      data: tagSlugs.map((slug) => ({ postId: saved.id, tagId: tagMap[slug].id })),
    });
  }

  console.log("Mayonity database seeded.");
  console.log("Admin: admin@mayonity.com / MayonityAdmin2050!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
