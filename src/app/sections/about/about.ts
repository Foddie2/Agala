import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT_PRINCIPLES } from '../../data/content';
import { PROFILE } from '../../data/profile';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page" aria-labelledby="about-title">
      <div class="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <app-section-heading
            [level]="1"
            eyebrow="About"
            title="The interface is where"
            accent="the business happens."
            headingId="about-title"
          />
          <img
            [src]="profile.portrait"
            [alt]="'Portrait of ' + profile.name"
            class="mt-10 hidden h-40 w-40 rounded-full object-cover lg:block"
            width="334"
            height="334"
          />
        </div>

        <div class="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            Most business software fails at the last mile. The data exists, the APIs work, and the
            team still exports everything to a spreadsheet because the tool in front of them is slow
            or confusing.
          </p>
          <p>
            <strong class="font-semibold text-ink">That last mile is my job.</strong> I take complex
            backend data — inventory, orders, sales, customer records — and turn it into fast,
            focused Angular interfaces that people actually use. Less copying between systems, fewer
            errors, quicker decisions.
          </p>
          <p>
            <strong class="font-semibold text-ink">I also work on the security side.</strong>
            My Application Security and DevSecOps work means I look at software the way an attacker
            would: reviewing code against the OWASP Top 10, building security checks into CI/CD,
            and setting up the logging and detection that lets a team respond quickly when something
            goes wrong.
          </p>
          <p>
            I work closely with the people who will use what I build, and I write code the next
            developer can pick up without a guided tour.
          </p>
        </div>
      </div>

      <div class="container-page mt-16">
        <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (p of principles; track p.title; let i = $index) {
            <li class="card p-7">
              <span class="font-serif text-3xl text-subtle italic">0{{ i + 1 }}</span>
              <h2 class="mt-4 text-lg font-bold tracking-tight">{{ p.title }}</h2>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ p.body }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class About {
  protected readonly profile = PROFILE;
  protected readonly principles = ABOUT_PRINCIPLES;
}
