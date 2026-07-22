import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillTagComponent } from '../skill-tag/skill-tag.component';
import { PROJECTS_DATA, Project } from '../../data/timeline.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SkillTagComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projSection') projSection!: ElementRef<HTMLElement>;
  projects: Project[] = PROJECTS_DATA;
  private ctx?: gsap.Context;

  lbProject: Project | null = null;
  lbIndex = 0;

  openLightbox(project: Project, index: number): void {
    this.lbProject = project;
    this.lbIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lbProject = null;
    document.body.style.overflow = '';
  }

  lbPrev(): void {
    if (!this.lbProject) return;
    this.lbIndex = (this.lbIndex - 1 + this.lbProject.images.length) % this.lbProject.images.length;
  }

  lbNext(): void {
    if (!this.lbProject) return;
    this.lbIndex = (this.lbIndex + 1) % this.lbProject.images.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.lbProject) return;
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowLeft') this.lbPrev();
    if (e.key === 'ArrowRight') this.lbNext();
  }

  ngAfterViewInit(): void {
    const mm = gsap.matchMedia();

    this.ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Header
        gsap.to('.proj__header', {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: this.projSection.nativeElement,
            start: 'top 80%',
          },
        });

        // Cards stagger
        gsap.utils.toArray<HTMLElement>('.proj__card').forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          });

          // Stagger chips inside card
          const chips = card.querySelectorAll('.chip');
          if (chips.length) {
            gsap.fromTo(chips,
              { opacity: 0, x: -10 },
              {
                opacity: 1,
                x: 0,
                stagger: 0.04,
                duration: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                },
              }
            );
          }
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.proj__header, .proj__card', { opacity: 1, y: 0 });
      });
    }, this.projSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
