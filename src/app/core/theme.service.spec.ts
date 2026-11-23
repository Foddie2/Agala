import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    // In-memory Storage so the spec doesn't depend on the test environment's localStorage.
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => (store[k] = v),
      removeItem: (k: string) => delete store[k],
      clear: () => (store = {}),
    });
    document.documentElement.classList.add('dark');
    TestBed.resetTestingModule();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('reads the initial theme from the <html> class', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('toggles the class on <html> and persists the choice', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(store['ba-theme']).toBe('light');

    service.toggle();
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
