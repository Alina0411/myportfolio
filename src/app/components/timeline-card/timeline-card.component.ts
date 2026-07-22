import { Component, Input } from '@angular/core';
import { SkillTagComponent } from '../skill-tag/skill-tag.component';
import { TimelineStage } from '../../data/timeline.data';

@Component({
  selector: 'app-timeline-card',
  standalone: true,
  imports: [SkillTagComponent],
  templateUrl: './timeline-card.component.html',
  styleUrl: './timeline-card.component.scss',
})
export class TimelineCardComponent {
  @Input({ required: true }) stage!: TimelineStage;
  @Input() side: 'left' | 'right' = 'left';
}
