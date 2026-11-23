import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'ba-theme';

/**
 * Owns the dark/light theme.
 *
 * The initial class on <html> is set by an inline script in index.html before
 * Angular boots (no flash), so this service reads the theme from the DOM rather
 * than from storage. All browser-only APIs are guarded for SSR/prerendering.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _theme = signal<Theme>(this.readInitialTheme());
  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  toggle(): void {
    this.set(this.isDark() ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this._theme.set(theme);
    if (!this.isBrowser) return;

    this.document.documentElement.classList.toggle('dark', theme === 'dark');
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0f0f0f' : '#fafafa');

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — theme still applies.
    }
  }

  private readInitialTheme(): Theme {
    if (!this.isBrowser) return 'dark';
    return this.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
}
