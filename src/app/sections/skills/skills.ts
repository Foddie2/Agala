import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/content';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section border-t border-line" aria-labelledby="skills-title">
      <div class="container-page">
        <app-section-heading
          eyebrow="Skills & Stack"
          title="Tools chosen for"
          accent="reliable, secure delivery."
          lead="From component architecture and the APIs behind it, to securing the pipeline it all ships through."
          headingId="skills-title"
        />

        <div class="mt-12 grid gap-4 md:grid-cols-2">
          @for (group of groups; track group.title) {
            <div class="card flex flex-col p-7">
              <h3 class="text-lg font-bold tracking-tight">{{ group.title }}</h3>
              <p class="mt-1.5 text-sm text-muted">{{ group.description }}</p>
              <ul class="mt-6 flex flex-wrap gap-2">
                @for (item of group.items; track item) {
                  <li
                    class="rounded-full border border-line bg-elevated px-3 py-1.5 text-[0.8rem] font-medium text-ink"
                  >
                    {{ item }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
}
