import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app'; // Points to src/app/app.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter([
      { path: '', component: App }, // Index page
      { path: '**', redirectTo: '' }, // Safe redirect
    ]),
  ],
};
