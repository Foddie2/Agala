import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../sections/hero/hero';
import { PROJECTS, TRACKS } from '../../data/content';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink, Icon, SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  protected readonly profile = PROFILE;
  protected readonly tracks = TRACKS;
  protected readonly projects = PROJECTS;
}
