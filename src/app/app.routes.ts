import { Routes } from '@angular/router';

const SITE = 'Benson Agala';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: `${SITE} — Senior Software Engineer · AppSec & DevSecOps`,
  },
  {
    path: 'projects',
    loadComponent: () => import('./sections/projects/projects').then((m) => m.Projects),
    title: `Projects — ${SITE}`,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page').then((m) => m.AboutPage),
    title: `About — ${SITE}`,
  },
  {
    path: 'services',
    loadComponent: () => import('./sections/services/services').then((m) => m.Services),
    title: `Services — ${SITE}`,
  },
  {
    path: 'experience',
    loadComponent: () => import('./sections/experience/experience').then((m) => m.Experience),
    title: `Experience — ${SITE}`,
  },
  {
    path: 'contact',
    loadComponent: () => import('./sections/contact/contact').then((m) => m.Contact),
    title: `Contact — ${SITE}`,
  },
  { path: '**', redirectTo: '' },
];
