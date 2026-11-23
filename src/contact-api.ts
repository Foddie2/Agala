import express, { Router } from 'express';
import nodemailer, { Transporter } from 'nodemailer';

/**
 * POST /api/contact — validates the contact form and emails it to you over SMTP.
 *
 * Configure with environment variables (or a `.env` file in the project root):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM (optional)
 */
const env = (key: string) => process.env[key]?.trim() ?? '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

let transporter: Transporter | undefined;
function getTransporter(): Transporter {
  if (!transporter) {
    const port = Number(env('SMTP_PORT') || 465);
    transporter = nodemailer.createTransport({
      host: env('SMTP_HOST'),
      port,
      secure: port === 465,
      auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    });
  }
  return transporter;
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function contactApi(): Router {
  const router = Router();

  router.post('/api/contact', express.json({ limit: '20kb' }), async (req, res) => {
    const name = clean(req.body?.name, 100).replace(/[\r\n]+/g, ' ');
    const email = clean(req.body?.email, 200);
    const message = clean(req.body?.message, 5000);
    const website = clean(req.body?.website, 200);

    // Honeypot filled in: answer as if it worked, send nothing.
    if (website) {
      res.json({ ok: true });
      return;
    }

    const errors: string[] = [];
    if (name.length < 2) errors.push('Please enter your name.');
    if (!EMAIL_RE.test(email)) errors.push('Please enter a valid email address.');
    if (message.length < 20) errors.push('Please write at least 20 characters.');
    if (errors.length) {
      res.status(400).json({ errors: errors.map((m) => ({ message: m })) });
      return;
    }

    if (rateLimited(req.ip ?? 'unknown')) {
      res.status(429).json({ error: 'Too many messages — please try again in a few minutes.' });
      return;
    }

    const to = env('CONTACT_TO');
    if (!env('SMTP_HOST') || !env('SMTP_USER') || !env('SMTP_PASS') || !to) {
      console.error('[contact] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO.');
      res.status(503).json({ error: 'The contact form is temporarily unavailable.' });
      return;
    }

    try {
      await getTransporter().sendMail({
        from: `"Portfolio contact form" <${env('CONTACT_FROM') || env('SMTP_USER')}>`,
        to,
        replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
        subject: `New enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
      res.json({ ok: true });
    } catch (err) {
      console.error('[contact] Failed to send email:', err);
      res.status(502).json({ error: 'Your message could not be delivered. Please try again shortly.' });
    }
  });

  return router;
}
