import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Agala | Home', // SEO friendly title for SSR
  },
  {
    path: '**',
    redirectTo: '',
  },
];
