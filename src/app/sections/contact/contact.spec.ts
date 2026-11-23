import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('shows validation errors when submitted empty', async () => {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(el.querySelector('#cf-name-err')).toBeTruthy();
    expect(el.querySelector('#cf-email-err')).toBeTruthy();
    expect(el.querySelector('#cf-details-err')).toBeTruthy();
  });
});
