import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../data/content';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-services',
  imports: [Icon, SectionHeading, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page" aria-labelledby="services-title">
      <div class="container-page">
        <app-section-heading
          [level]="1"
          eyebrow="Services"
          title="What you can"
          accent="hire me for."
          lead="Focused engagements with a clear scope, regular demos and production-ready handover."
          headingId="services-title"
        />

        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (service of services; track service.title) {
            <article
              class="card group flex flex-col p-7 transition-colors hover:border-line-strong sm:p-8"
            >
              <span
                class="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-elevated text-ink transition-colors group-hover:bg-invert group-hover:text-on-invert"
              >
                <app-icon [name]="service.icon" [size]="22" />
              </span>
              <h2 class="mt-6 text-xl font-bold tracking-tight">{{ service.title }}</h2>
              <p class="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{{ service.body }}</p>
              <ul class="mt-6 flex flex-wrap gap-1.5 pt-1">
                @for (d of service.deliverables; track d) {
                  <li class="pill">{{ d }}</li>
                }
              </ul>
            </article>
          }
        </div>

        <div
          class="card mt-4 flex flex-col items-start justify-between gap-5 p-7 sm:flex-row sm:items-center sm:p-8"
        >
          <p class="text-lg font-semibold tracking-tight">
            Have a workflow to fix or an app to secure?
            <span class="font-serif font-normal text-muted italic">Let's scope it together.</span>
          </p>
          <a routerLink="/contact" class="btn-primary btn-lg">
            Start a project <app-icon name="arrow-right" [size]="16" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly services = SERVICES;
}
