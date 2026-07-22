import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-tag',
  standalone: true,
  templateUrl: './skill-tag.component.html',
  styleUrl: './skill-tag.component.scss',
})
export class SkillTagComponent {
  @Input({ required: true }) label!: string;
  @Input() accentColor = '#00f0ff';
}
