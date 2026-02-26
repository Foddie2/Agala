import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
// Import the modules your component uses
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Hero', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Since Hero is a standalone component, it goes in imports
      imports: [
        HeroComponent,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        NoopAnimationsModule, // Prevents animation-related timeouts in tests
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;

    // fixture.detectChanges() is usually preferred over whenStable()
    // for initial rendering in basic 'should create' tests
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main headline', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Architecting');
  });
});
