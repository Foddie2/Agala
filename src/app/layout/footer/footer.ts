import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NAV_LINKS } from '../../data/content';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-line">
      <div
        class="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between"
      >
        <a routerLink="/" class="flex items-center gap-3">
          <span
            class="grid h-9 w-9 place-items-center rounded-full bg-invert text-[0.8rem] font-extrabold text-on-invert"
            >{{ profile.initials }}</span
          >
          <span>
            <span class="block text-sm font-semibold">{{ profile.name }}</span>
            <span class="block text-xs text-subtle">{{ profile.headline }}</span>
          </span>
        </a>

        <nav aria-label="Footer">
          <ul class="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            @for (link of links; track link.path) {
              <li>
                <a [routerLink]="link.path" class="hover:text-ink">{{ link.label }}</a>
              </li>
            }
          </ul>
        </nav>

        <div class="flex items-center gap-2">
          <a
            [href]="profile.github"
            target="_blank"
            rel="noopener"
            class="icon-btn"
            aria-label="GitHub"
          >
            <app-icon name="github" />
          </a>
          <a
            [href]="profile.linkedin"
            target="_blank"
            rel="noopener"
            class="icon-btn"
            aria-label="LinkedIn"
          >
            <app-icon name="linkedin" />
          </a>
          <a [href]="profile.x" target="_blank" rel="noopener" class="icon-btn" aria-label="X">
            <app-icon name="x" />
          </a>
          <button type="button" class="icon-btn ml-auto md:ml-0" aria-label="Back to top" (click)="toTop()">
            <app-icon name="arrow-up" />
          </button>
        </div>
      </div>
      <div class="container-page pb-10 text-center text-xs text-subtle md:text-left">© {{ year }} {{ profile.name }}.</div>
    </footer>
  `,
})
export class Footer {
  private readonly document = inject(DOCUMENT);
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();

  protected toTop(): void {
    // Only reachable via a click, so this always runs in the browser.
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
