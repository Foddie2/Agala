import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component'; // Ensure folder 'home' exists

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideClientHydration(),
    provideRouter([
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
};
