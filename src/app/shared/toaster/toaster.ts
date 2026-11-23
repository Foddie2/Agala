import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../core/toast.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-toaster',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-3 p-4 sm:inset-x-auto sm:right-0 sm:items-end sm:p-6"
      aria-live="polite"
      aria-atomic="false"
    >
      @for (toast of toasts(); track toast.id) {
        <div
          class="toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line bg-elevated p-4 pr-3 text-ink shadow-2xl shadow-black/30"
          [attr.role]="toast.kind === 'error' ? 'alert' : 'status'"
        >
          <span
            class="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
            [class]="
              toast.kind === 'success'
                ? 'bg-emerald-500/15 text-emerald-500'
                : toast.kind === 'error'
                  ? 'bg-red-500/15 text-red-500'
                  : 'bg-invert/10 text-ink'
            "
          >
            <app-icon
              [name]="toast.kind === 'success' ? 'check' : toast.kind === 'error' ? 'close' : 'mail'"
              [size]="15"
            />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold">{{ toast.title }}</p>
            @if (toast.message) {
              <p class="mt-0.5 text-sm text-muted">{{ toast.message }}</p>
            }
          </div>
          <button
            type="button"
            class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-subtle hover:bg-invert/10 hover:text-ink"
            aria-label="Dismiss notification"
            (click)="dismiss(toast.id)"
          >
            <app-icon name="close" [size]="14" />
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .toast-in {
      animation: toast-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .toast-in {
        animation: none;
      }
    }
  `,
})
export class Toaster {
  private readonly toastService = inject(ToastService);
  protected readonly toasts = this.toastService.toasts;

  protected dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
