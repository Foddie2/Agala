import { TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideAnimations(), // Required for Material components in App
        provideRouter([]), // Required if your Navbar uses [routerLink]
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the brand name in the navbar', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // Trigger initial data binding
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    // We check for 'AGALA' (from your Navbar) instead of 'Hello, Agala'
    expect(compiled.querySelector('.text-xl')?.textContent).toContain('AGALA');
  });
});
