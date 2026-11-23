import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { ToastService } from './core/toast.service';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Toaster } from './shared/toaster/toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Toaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn-primary"
      >Skip to content</a
    >
    <app-navbar />
    <main id="main">
      <router-outlet />
    </main>
    <app-footer />
    <app-toaster />
  `,
})
export class App {
  constructor() {
    const swUpdate = inject(SwUpdate, { optional: true });
    const toast = inject(ToastService);
    const destroyRef = inject(DestroyRef);

    // PWA: tell the visitor when a newer version of the site has been downloaded.
    afterNextRender(() => {
      if (!swUpdate?.isEnabled) return;
      const sub = swUpdate.versionUpdates
        .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
        .subscribe(() =>
          toast.info('Update available', 'A newer version of this site is ready — refresh to load it.'),
        );
      destroyRef.onDestroy(() => sub.unsubscribe());
    });
  }
}
