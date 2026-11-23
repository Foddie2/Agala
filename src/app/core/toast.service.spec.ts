import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  it('adds and dismisses toasts', () => {
    const svc = TestBed.inject(ToastService);
    svc.success('Message sent!', 'Thanks');
    expect(svc.toasts()).toHaveLength(1);
    expect(svc.toasts()[0]).toMatchObject({ kind: 'success', title: 'Message sent!' });
    svc.dismiss(svc.toasts()[0].id);
    expect(svc.toasts()).toHaveLength(0);
  });
});
