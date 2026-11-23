import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCE } from '../../data/content';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page" aria-labelledby="experience-title">
      <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <app-section-heading
            [level]="1"
            eyebrow="Experience"
            title="Systems shipped,"
            accent="roles held."
            lead="Client deliverables and roles where I built and maintained business-critical software."
            headingId="experience-title"
          />
        </div>

        <ol class="relative border-l border-line">
          @for (item of items; track item.role + item.period; let first = $first) {
            <li class="relative pb-12 pl-8 last:pb-0 sm:pl-10">
              <span
                class="absolute top-1.5 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-canvas"
                [class]="first ? 'bg-emerald-500' : 'bg-line-strong'"
                aria-hidden="true"
              ></span>
              <p class="text-xs font-semibold tracking-[0.14em] text-subtle uppercase">
                {{ item.period }}
              </p>
              <h2 class="mt-2 text-xl font-bold tracking-tight">{{ item.role }}</h2>
              <p class="mt-0.5 font-serif text-lg text-muted italic">{{ item.company }}</p>
              <p class="mt-3 text-[0.95rem] leading-relaxed text-muted">{{ item.summary }}</p>
              <ul class="mt-4 space-y-2">
                @for (h of item.highlights; track h) {
                  <li class="flex gap-3 text-sm leading-relaxed text-muted">
                    <span class="mt-2 h-1 w-3 shrink-0 rounded-full bg-line-strong"></span>
                    {{ h }}
                  </li>
                }
              </ul>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Experience {
  protected readonly items = EXPERIENCE;
}
