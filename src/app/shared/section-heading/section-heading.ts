import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block max-w-2xl' },
  template: `
    <p class="eyebrow">{{ eyebrow() }}</p>
    @if (level() === 1) {
      <h1 [id]="headingId()" class="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
        <ng-container *ngTemplateOutlet="text" />
      </h1>
    } @else {
      <h2 [id]="headingId()" class="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        <ng-container *ngTemplateOutlet="text" />
      </h2>
    }
    <ng-template #text>
      {{ title() }}
      @if (accent()) {
        <span class="font-serif font-normal tracking-normal italic">{{ accent() }}</span>
      }
    </ng-template>
    @if (lead()) {
      <p class="mt-4 text-base leading-relaxed text-muted sm:text-lg">{{ lead() }}</p>
    }
  `,
  imports: [NgTemplateOutlet],
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly accent = input<string>();
  readonly lead = input<string>();
  readonly headingId = input<string>();
  /** 1 for the page title, 2 for sections within a page. */
  readonly level = input<1 | 2>(2);
}
