import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../core/toast.service';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

/** Shape of a Formspree error response: { errors: [{ message }] }. */
interface FormErrorBody {
  error?: string;
  errors?: { message?: string }[];
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
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
    if (this.status() === 'sending') return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Please check the form', 'A few fields need your attention.');
      return;
    }
    const { name, email, details, website } = this.form.getRawValue();
    if (website) {
      // Bot filled the honeypot: pretend it worked, send nothing.
      this.onSent();
      return;
    }

    if (this.isBrowser && !navigator.onLine) {
      this.toast.error("You're offline", 'Reconnect to the internet and try again.');
      return;
    }

    this.status.set('sending');
    this.http
      .post(
        PROFILE.contactFormEndpoint,
        { name, email, message: details, website },
        { headers: { Accept: 'application/json' } },
      )
      .subscribe({
        next: () => this.onSent(),
        error: (err: HttpErrorResponse) => {
          this.status.set('error');
          this.toast.error(
            "Message couldn't be sent",
            this.errorMessage(err) ?? 'Please try again in a moment.',
          );
        },
      });
  }

  protected async copyEmail(): Promise<void> {
    if (!this.isBrowser) return;
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      this.toast.success('Email address copied');
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions).
      this.toast.error("Couldn't copy", PROFILE.email);
    }
  }

  private onSent(): void {
    this.status.set('sent');
    this.form.reset();
    this.toast.success('Message sent!', "Thanks for reaching out — I'll get back to you soon.");
  }

  private errorMessage(err: HttpErrorResponse): string | undefined {
    if (err.status === 0) return 'Network error — check your connection and try again.';
    const body = err.error as FormErrorBody | null;
    const msg = body?.errors?.map((e) => e.message).filter(Boolean).join(' ') || body?.error;
    return msg || undefined;
  }
}
