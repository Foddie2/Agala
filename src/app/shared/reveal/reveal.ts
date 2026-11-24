import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

export type RevealVariant = 'up' | 'fade' | 'scale' | 'left' | 'right';

/**
 * Fades/slides an element in the first time it scrolls into view.
 *
 *   <div appReveal>…</div>
 *   <div appReveal="scale" [revealDelay]="i * 80">…</div>
 *
 * The hidden start state lives in styles.css and only applies when <html> has
 * the `reveal-on` class (set by an inline script in index.html when JS runs and
 * the visitor has not asked for reduced motion), so server-rendered and no-JS
 * pages are never left blank.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[attr.data-reveal]': 'appReveal() || "up"',
    '[style.--reveal-delay]': 'revealDelay() + "ms"',
  },
})
export class Reveal {
  /** Motion style. Defaults to a short upward slide. */
  readonly appReveal = input<RevealVariant | ''>('');
  /** Delay in ms, used to stagger items in a list. */
  readonly revealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        el.classList.add('is-revealed');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('is-revealed');
            observer.disconnect();
          }
        },
        // Trigger slightly before the element is fully on screen.
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
