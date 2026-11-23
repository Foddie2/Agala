import { IconName } from '../shared/icon/icon';
import { PROFILE } from './profile';

export interface NavLink {
  path: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
];

export const HERO_TAGS = [
  'Angular',
  'TypeScript',
  'REST APIs',
  'Shopify',
  'AppSec',
  'DevSecOps',
];

/** Floating "+" badges around the hero portrait (two short lines each). */
export const HERO_BADGES: [string, string][] = [
  ['Enterprise dashboards', '& business systems'],
  ['API & Shopify', 'integrations'],
  ['AppSec & DevSecOps', 'detection & response'],
];

export interface Track {
  icon: IconName;
  title: string;
  body: string;
  points: string[];
  link: { label: string; path: string };
}

/** The two disciplines shown side by side on the home page. */
export const TRACKS: Track[] = [
  {
    icon: 'code',
    title: 'Frontend Engineering',
    body: 'Angular applications and dashboards that turn complex business data into fast, usable interfaces.',
    points: [
      'Standalone Angular, Signals, RxJS',
      'Dashboards, inventory & order systems',
      'REST API and Shopify integrations',
    ],
    link: { label: 'See the projects', path: '/projects' },
  },
  {
    icon: 'shield',
    title: 'Application Security',
    body: 'Security built into the delivery pipeline — from secure code to detecting and responding to threats in production.',
    points: [
      'AppSec & secure code review (OWASP)',
      'DevSecOps: security checks in CI/CD',
      'Detection engineering & incident response',
    ],
    link: { label: 'Security services', path: '/services' },
  },
];

export interface Principle {
  title: string;
  body: string;
}

export const ABOUT_PRINCIPLES: Principle[] = [
  {
    title: 'Start from the workflow',
    body: 'Before writing a component I map who uses the system, what they need to decide, and where time is lost today.',
  },
  {
    title: 'Make data usable',
    body: 'APIs return records. People need answers. I shape raw responses into views that surface what matters first.',
  },
  {
    title: 'Secure by default',
    body: 'Input validation, least privilege, dependency hygiene and logging are part of the build, not an audit after launch.',
  },
  {
    title: 'Build to be maintained',
    body: 'Typed models, clear boundaries and predictable state, so the next feature is cheaper than the last.',
  },
];

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

// TODO: trim or extend each list so it matches exactly what you can speak to in an interview.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend & Core',
    description: 'The foundation of every interface I ship.',
    items: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Signals',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Angular Material',
    ],
  },
  {
    title: 'Integrations & Commerce',
    description: 'Connecting the UI to the systems the business runs on.',
    items: [
      'REST APIs',
      'Shopify Storefront API',
      'Shopify Admin API',
      'Custom Shopify Themes',
      'Webhooks',
      'State Management',
    ],
  },
  {
    title: 'Security Engineering',
    description: 'Application Security, DevSecOps, Detection & Response.',
    items: [
      'Application Security (AppSec)',
      'OWASP Top 10',
      'Secure Code Review',
      'Threat Modeling',
      'SAST / DAST / SCA in CI/CD',
      'Secrets Management',
      'Detection Engineering',
      'Log Analysis & SIEM',
      'Incident Response',
    ],
  },
  {
    title: 'Tools & Workflow',
    description: 'How I keep delivery fast and quality high.',
    items: ['Git', 'GitHub', 'CI/CD', 'SSR & Hydration', 'Performance Optimization', 'Responsive Design'],
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  outcomes: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  /** Leave null to show "Request a Demo" linking to the contact page. */
  demoUrl: string | null;
  sourceUrl: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'inventory-dashboard',
    title: 'Inventory & Warehouse Dashboard',
    category: 'Operations',
    summary: 'Real-time stock tracking and low-inventory alerts that replaced manual spreadsheets.',
    problem:
      'Stock levels lived in shared spreadsheets. Counts drifted, orders were picked against stale numbers, and low stock was only noticed once a shelf was empty.',
    solution:
      'A real-time Angular dashboard for stock tracking and order fulfilment, backed by REST APIs, with configurable low-inventory alerts and a single source of truth for every SKU.',
    outcomes: [
      'Replaced manual spreadsheet updates',
      'Low-stock alerts before stock-outs',
      'Faster pick-and-pack workflow',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'Tailwind CSS'],
    image: '/images/projects/inventory-dashboard.jpg',
    imageAlt:
      'Inventory dashboard showing stock KPIs, inventory flow chart, stock levels by day and an inventory items table',
    demoUrl: null,
    sourceUrl: PROFILE.github,
  },
  {
    slug: 'ecommerce-store',
    title: 'E-commerce Store — Shopify & Custom Web',
    category: 'Commerce',
    summary: 'A responsive storefront with fast product filtering, persistent cart and a short checkout.',
    problem:
      'A growing catalogue was hard to browse, the cart lost state between pages, and a long checkout path was costing completed orders.',
    solution:
      'A responsive storefront on the Shopify Storefront API with dynamic product filtering, persistent cart state and a streamlined path from product page to checkout.',
    outcomes: [
      'Filter a full catalogue instantly',
      'Cart persists across sessions',
      'Fewer steps to checkout',
    ],
    stack: ['Angular', 'Shopify Storefront API', 'TypeScript', 'Signals', 'Tailwind CSS'],
    image: '/images/projects/ecommerce-store.jpg',
    imageAlt: 'Electronics storefront shown on desktop and mobile, with hero banner, categories and best sellers',
    demoUrl: null,
    sourceUrl: PROFILE.github,
  },
  {
    slug: 'analytics-dashboard',
    title: 'Business Analytics Dashboard',
    category: 'Analytics',
    summary: 'Executive KPIs, interactive charts and exportable reports from raw sales data.',
    problem:
      'Leadership waited on hand-built weekly reports. By the time sales and operations numbers arrived, the decisions they were meant to inform had already been made.',
    solution:
      'An executive dashboard that turns raw sales and operations API data into interactive charts, KPI cards and exportable reports, available on demand.',
    outcomes: [
      'KPIs available on demand',
      'Drill down from summary to detail',
      'One-click CSV/PDF exports',
    ],
    stack: ['Angular', 'TypeScript', 'REST APIs', 'Charting', 'SSR'],
    image: '/images/projects/analytics-dashboard.jpg',
    imageAlt: 'Sales overview dashboard with KPI cards, monthly performance bar chart and sales growth gauge',
    demoUrl: null,
    sourceUrl: PROFILE.github,
  },
];

export interface Service {
  icon: IconName;
  title: string;
  body: string;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    icon: 'code',
    title: 'Custom Angular Web Applications',
    body: 'Production-grade applications built on modern standalone Angular, typed end to end and structured to grow with your business.',
    deliverables: ['Standalone architecture', 'SSR & SEO-ready', 'Tested, documented code'],
  },
  {
    icon: 'dashboard',
    title: 'Business & Admin Dashboards',
    body: 'Internal tools that replace spreadsheets and email chains: inventory, orders, reporting and role-based admin panels.',
    deliverables: ['Data tables & filters', 'KPI & chart views', 'Role-based access'],
  },
  {
    icon: 'plug',
    title: 'API & Third-Party Integrations',
    body: 'Connect your frontend to payment, logistics, CRM or in-house APIs, with resilient error handling and clean data models.',
    deliverables: ['REST API integration', 'Webhooks', 'Auth & error handling'],
  },
  {
    icon: 'bag',
    title: 'Shopify Storefront Development',
    body: 'Custom Shopify themes and headless storefronts built around fast product discovery and a short path to checkout.',
    deliverables: ['Custom themes', 'Headless storefronts', 'Storefront & Admin APIs'],
  },
  {
    icon: 'shield',
    title: 'Application Security & DevSecOps',
    body: 'Find and fix vulnerabilities before attackers do, and make security checks an automatic part of every release.',
    deliverables: ['OWASP-based security review', 'SAST/DAST/SCA in CI/CD', 'Secrets & dependency hygiene'],
  },
  {
    icon: 'radar',
    title: 'Detection & Response',
    body: 'Logging, alerting and response playbooks so suspicious activity in your applications is spotted and handled quickly.',
    deliverables: ['Security logging & alerts', 'Detection rules', 'Incident response runbooks'],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

// TODO: replace these entries with your real roles, companies and dates.
// If you have held a security role, add it here — it carries a lot of weight with recruiters.
export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Frontend Developer — Angular',
    company: 'Freelance & Contract',
    period: '2023 — Present',
    summary:
      'Designing and building business applications for clients in retail, logistics and e-commerce.',
    highlights: [
      'Delivered inventory and order-management dashboards that replaced spreadsheet workflows.',
      'Built Shopify storefronts and integrations with the Storefront and Admin APIs.',
      'Added security checks (dependency scanning, secrets detection) to project CI pipelines.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Business Systems & E-commerce',
    period: '2021 — 2023',
    summary: 'Built and maintained customer-facing and internal web applications.',
    highlights: [
      'Integrated REST APIs for catalogue, orders and reporting data.',
      'Built reusable UI components that sped up delivery across projects.',
      'Improved load performance and mobile responsiveness of key pages.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Independent Projects',
    period: '2019 — 2021',
    summary: 'Built responsive websites and early web applications for small businesses.',
    highlights: [
      'Shipped responsive sites with HTML, CSS and TypeScript.',
      'Set up Git-based workflows and deployment for client projects.',
    ],
  },
];
