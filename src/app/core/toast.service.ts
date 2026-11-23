import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  title: string;
  message?: string;
}

/** App-wide toast notifications, rendered by <app-toaster> in the root component. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  success(title: string, message?: string): void {
    this.show('success', title, message);
  }

  error(title: string, message?: string): void {
    this.show('error', title, message, 8000);
  }

  info(title: string, message?: string): void {
    this.show('info', title, message);
  }

  show(kind: ToastKind, title: string, message?: string, duration = 5000): void {
    const id = ++this.nextId;
    this._toasts.update((list) => [...list, { id, kind, title, message }]);
    this.timers.set(
      id,
      setTimeout(() => this.dismiss(id), duration),
    );
  }

  dismiss(id: number): void {
    clearTimeout(this.timers.get(id));
    this.timers.delete(id);
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
