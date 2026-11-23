import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly profile = PROFILE;
  protected readonly status = signal<SubmitStatus>('idle');
  protected readonly copied = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    details: ['', [Validators.required, Validators.minLength(20)]],
    // Honeypot: hidden from people, often filled in by bots.
    website: [''],
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer));
  }

  protected showError(control: 'name' | 'email' | 'details'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, details, website } = this.form.getRawValue();
    if (website) return; // bot

    if (PROFILE.contactFormEndpoint) {
      this.status.set('sending');
      this.http
        .post(
          PROFILE.contactFormEndpoint,
          { name, email, message: details },
          { headers: { Accept: 'application/json' } },
        )
        .subscribe({
          next: () => {
            this.status.set('sent');
            this.form.reset();
          },
          error: () => this.status.set('error'),
        });
      return;
    }

    // No backend configured: hand off to the visitor's email client.
    if (!this.isBrowser) return;
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`${details}\n\n— ${name} (${email})`);
    this.document.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    this.status.set('mailto');
  }

  protected async copyEmail(): Promise<void> {
    if (!this.isBrowser) return;
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions) — fall back to mail client.
      this.document.location.href = `mailto:${PROFILE.email}`;
    }
  }
}
