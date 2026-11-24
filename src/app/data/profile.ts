/**
 * Personal details and site-wide settings. Edit this file to update contact
 * info everywhere on the site.
 */
export const PROFILE = {
  name: 'Benson Agala',
  initials: 'BA',
  role: 'Senior Software Engineer',
  focus: 'Application Security',
  headline: 'Senior Software Engineer · AppSec & DevSecOps',

  // TODO: replace with the public email address you want clients to use.
  email: 'bensonagala@live.com',

  github: 'https://github.com/Foddie2',
  linkedin: 'https://www.linkedin.com/in/benson-agala/',
  // TODO: replace with your X (Twitter) profile URL.
  x: 'https://x.com/Foddie2',

  portrait: '/images/benson-agala-square.jpg',

  availableForWork: true,

  /** Roles shown to recruiters on the home page. */
  openTo: [
    'Senior Software Engineer (Angular · Vue/Nuxt)',
    'Application Security Engineer',
    'DevSecOps Engineer',
  ],
  // TODO: adjust to the engagement types you actually want.
  engagement: 'Full-time · Contract · Remote',

  /**
   * Path to your CV, e.g. "/benson-agala-cv.pdf" (put the file in /public).
   * The "Download CV" buttons only appear when this is set.
   */
  cvUrl: '/benson-agala-cv.pdf',

  /**
   * Where the contact form posts. "/api/contact" is this app's own Express
   * endpoint (src/contact-api.ts), which emails you via SMTP — see .env.example.
   */
  contactFormEndpoint: '/api/contact',
} as const;
