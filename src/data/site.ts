export const site = {
  name: "Yeasin Shamim",
  handle: "yeasin",
  role: "Full-Stack Web Engineer",
  tagline:
    "4+ years building React, Next.js and TypeScript products for US companies, from database queries to production deployment.",
  location: "Noakhali, Bangladesh · Remote",
  email: "yeasinshamim7@gmail.com",
  url: "https://yeasin-shamim-dev.vercel.app",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yeasin-shamim-dev" },
    { label: "GitHub", href: "https://github.com/" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  stack: string[];
  accent: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "everlab-merchant",
    title: "Everlab Merchant Application",
    year: "2023 – 24",
    category: "SaaS platform",
    summary:
      "Print-on-demand fulfillment platform where merchants design products, place orders and connect their Shopify stores. Co-led the front end: account creation, product design editor, ordering and Stripe payments.",
    stack: ["TypeScript", "React", "Zustand", "Framer Motion", "Node.js", "PostgreSQL", "Stripe", "Shopify"],
    accent: "#7c5cff",
  },
  {
    slug: "beast-analytics",
    title: "Creator Analytics Dashboards",
    year: "2024 – 26",
    category: "Internal tools · Beast Industries",
    summary:
      "Analytics dashboards and internal tools for a multi-brand media org: reusable UI components, PostgreSQL queries, CRUD back ends, REST integrations, and Vercel deployments owned end to end.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST APIs", "Vercel"],
    accent: "#19e6c1",
  },
  {
    slug: "email-verify",
    title: "Email Verify",
    year: "2024",
    category: "Side project",
    summary:
      "Email validation app with social login, credit purchases and billing through both Stripe and PayPal.",
    stack: ["React", "Redux Toolkit", "Tailwind CSS", "Clerk", "PostgreSQL", "Stripe", "PayPal"],
    accent: "#ff7a59",
  },
  {
    slug: "layerhub",
    title: "Layerhub Design Platform",
    year: "2022 – 23",
    category: "Web app",
    summary:
      "Developed and maintained features for a browser-based design editor used to build graphics and templates.",
    stack: ["TypeScript", "React", "Node.js"],
    accent: "#ffd166",
  },
];

export const skills = [
  { name: "TypeScript", level: 94, group: "Core" },
  { name: "React / Next.js", level: 95, group: "Core" },
  { name: "Node / Express", level: 88, group: "Core" },
  { name: "PostgreSQL / Prisma", level: 85, group: "Data" },
  { name: "D3 / Recharts", level: 84, group: "Data" },
  { name: "Framer Motion", level: 90, group: "Motion" },
  { name: "Tailwind / UI", level: 92, group: "Motion" },
  { name: "AWS / Docker / Vercel", level: 80, group: "Data" },
];

export const timeline = [
  {
    period: "Jul 2024 — Nov 2026",
    title: "Front End Developer",
    org: "Beast Industries (MrBeastYouTube, LLC) · Remote, USA · Contract",
    text: "Built and maintained analytics dashboards and internal tools with React, Next.js, TypeScript and Tailwind. Owned reusable components, PostgreSQL queries, CRUD back ends and REST integrations. Managed Vercel hosting, deployments and production debugging.",
  },
  {
    period: "Sep 2023 — Jun 2024",
    title: "Front End Developer",
    org: "Everlab, Inc. · Remote, USA",
    text: "Co-led front-end development of a print-on-demand fulfillment platform for merchants. Built account creation, product design editing, ordering, Shopify connection and Stripe payments. CTO recommendation letter available.",
  },
  {
    period: "Oct 2022 — Sep 2023",
    title: "Software Developer",
    org: "Layerhub SRL · Remote, Peru · Contract",
    text: "Developed and maintained features for a web-based design platform.",
  },
  {
    period: "Jul 2022 — Oct 2022",
    title: "Web Development Intern",
    org: "Mind Harmonics · Remote, India",
    text: "Developed the company website. Commended for attention to detail.",
  },
];
