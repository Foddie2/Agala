/**
 * Personal details and site-wide settings. Edit this file to update contact
 * info everywhere on the site.
 */
export const PROFILE = {
  name: 'Benson Agala',
  initials: 'BA',
  role: 'Frontend & Angular Developer',
  focus: 'Application Security',
  headline: 'Frontend Engineer · AppSec & DevSecOps',

  // TODO: replace with the public email address you want clients to use.
  email: 'hello@example.com',

  github: 'https://github.com/Foddie2',
  linkedin: 'https://www.linkedin.com/in/benson-agala/',

  portrait: '/images/benson-agala-square.jpg',

  availableForWork: true,

  /** Roles shown to recruiters on the home page. */
  openTo: [
    'Frontend / Angular Engineer',
    'Application Security Engineer',
    'DevSecOps Engineer',
  ],
  // TODO: adjust to the engagement types you actually want.
  engagement: 'Full-time · Contract · Remote',

  /**
   * Path to your CV, e.g. "/benson-agala-cv.pdf" (put the file in /public).
   * The "Download CV" buttons only appear when this is set.
   */
  cvUrl: '',

  /**
   * Optional form backend (e.g. a Formspree endpoint like
   * "https://formspree.io/f/xxxxxxx"). When empty, the contact form falls back
   * to opening the visitor's email client with the message pre-filled.
   */
  contactFormEndpoint: '',
} as const;
