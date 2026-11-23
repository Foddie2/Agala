import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from '../../sections/about/about';
import { Skills } from '../../sections/skills/skills';

@Component({
  selector: 'app-about-page',
  imports: [About, Skills],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-about />
    <app-skills />
  `,
})
export class AboutPage {}
